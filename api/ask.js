/**
 * Vercel Serverless Function - AI Assistant Chat
 * 文字問答 API endpoint (使用 Assistants API + vector store)
 */

import { OpenAI } from 'openai';

// 初始化 OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Vector Store ID (您提到的 vs_68974a0ad7f08191b6de1a5e41a8e01b)
const VECTOR_STORE_ID = 'vs_68974a0ad7f08191b6de1a5e41a8e01b';

export default async function handler(req, res) {
    // 設定 CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 處理 OPTIONS 請求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 只允許 POST 請求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { question, mode = 'work' } = req.body;

        // 檢查是否有問題
        if (!question || typeof question !== 'string' || question.trim().length === 0) {
            return res.status(400).json({
                error: '請提供有效的問題',
                success: false
            });
        }

        // 根據模式調整 system prompt
        const systemPrompt = mode === 'travel'
            ? `你是台北捷運智能助手，專門協助旅遊相關問題。請用繁體中文回答，提供實用的旅遊建議、景點資訊、交通規劃等。保持友善和專業的語調。`
            : `你是台北捷運智能助手，專門協助工作通勤相關問題。請用繁體中文回答，提供實用的交通資訊、路線規劃、時刻表查詢等。保持友善和專業的語調。`;

        console.log(`Processing ${mode} mode question:`, question);

        // 1. 建立臨時 assistant
        const assistant = await openai.beta.assistants.create({
            name: `Metro AI Assistant - ${mode} mode`,
            instructions: systemPrompt,
            model: "gpt-4o-mini",
            tools: [{ type: "file_search" }],
            tool_resources: {
                file_search: {
                    vector_store_ids: [VECTOR_STORE_ID]
                }
            }
        });

        console.log('Assistant created:', assistant.id);

        // 2. 建立對話 thread
        const thread = await openai.beta.threads.create();
        console.log('Thread created:', thread.id);

        // 3. 新增使用者訊息到 thread
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: question
        });

        // 4. 執行 assistant 並等待完成
        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistant.id
        });

        console.log('Run status:', run.status);

        if (run.status !== 'completed') {
            throw new Error(`Assistant run failed with status: ${run.status}`);
        }

        // 5. 取得回應訊息
        const messages = await openai.beta.threads.messages.list(thread.id, {
            limit: 1,
            order: 'desc'
        });

        if (!messages.data || messages.data.length === 0) {
            throw new Error('No response from assistant');
        }

        const response = messages.data[0];
        let answerText = '';

        // 解析回應內容
        if (response.content && response.content.length > 0) {
            const content = response.content[0];
            if (content.type === 'text') {
                answerText = content.text.value;
            }
        }

        if (!answerText) {
            throw new Error('Empty response from assistant');
        }

        // 6. 清理資源 (刪除臨時 assistant 和 thread)
        try {
            await Promise.all([
                openai.beta.assistants.del(assistant.id),
                openai.beta.threads.del(thread.id)
            ]);
            console.log('Cleanup completed');
        } catch (cleanupError) {
            console.warn('Cleanup warning:', cleanupError.message);
        }

        // 7. 回傳成功結果
        res.status(200).json({
            success: true,
            answer: answerText,
            mode: mode,
            timestamp: new Date().toISOString(),
            question: question
        });

    } catch (error) {
        console.error('Ask API Error:', error);

        // 回傳錯誤訊息
        res.status(500).json({
            success: false,
            error: 'AI 助手回應失敗',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
