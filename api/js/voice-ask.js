/**
 * Vercel Serverless Function - Voice to AI Assistant Chat with SSE
 * 語音轉文字 + AI問答 合併API endpoint (使用 SSE 串流傳輸)
 */

import { OpenAI } from 'openai';
import formidable from 'formidable';
import fs from 'fs';

// 初始化 OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Vector Store ID
const VECTOR_STORE_ID = 'vs_68974a0ad7f08191b6de1a5e41a8e01b';

// 配置 Vercel 不解析 body
export const config = {
    api: {
        bodyParser: false,
    },
};

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

    // 設定 SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        // 解析 multipart/form-data
        const form = formidable({
            maxFileSize: 25 * 1024 * 1024, // 25MB limit
            keepExtensions: true,
        });

        const [fields, files] = await form.parse(req);

        // 檢查是否有音訊檔案
        if (!files.audio || !files.audio[0]) {
            sendSSEEvent(res, 'error', { error: '缺少音訊檔案' });
            return res.end();
        }

        // 獲取模式參數
        const mode = fields.mode?.[0] || 'work';

        const audioFile = files.audio[0];

        // 檢查檔案類型
        const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/webm'];
        if (!allowedTypes.includes(audioFile.mimetype) &&
            !audioFile.originalFilename?.match(/\.(mp3|wav|mp4|m4a|webm)$/i)) {
            sendSSEEvent(res, 'error', { error: '不支援的音訊格式' });
            return res.end();
        }

        // 發送開始處理事件
        sendSSEEvent(res, 'status', { message: '開始處理語音...' });

        // 步驟1: 語音轉文字
        const audioBuffer = fs.readFileSync(audioFile.filepath);
        const file = new File([audioBuffer], audioFile.originalFilename || 'audio.mp3', {
            type: audioFile.mimetype || 'audio/mpeg'
        });

        sendSSEEvent(res, 'status', { message: '轉換語音為文字...' });

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            language: 'zh',
            response_format: 'text'
        });

        // 清理暫存檔案
        fs.unlinkSync(audioFile.filepath);

        if (!transcription || !transcription.trim()) {
            sendSSEEvent(res, 'error', { error: '語音識別失敗，請重試' });
            return res.end();
        }

        // 發送識別到的文字
        sendSSEEvent(res, 'stt_result', { text: transcription.trim() });

        // 步驟2: AI問答
        sendSSEEvent(res, 'status', { message: 'AI正在思考中...' });

        // 根據模式調整 system prompt
        const systemPrompt = mode === 'travel'
            ? `你是捷境 MetroSense，專門協助旅遊相關問題。請用繁體中文回答，提供實用的旅遊建議、景點資訊、交通規劃等。保持友善和專業的語調。`
            : `你是捷境 MetroSense，專門協助工作通勤相關問題。請用繁體中文回答，提供實用的交通資訊、路線規劃、時刻表查詢等。保持友善和專業的語調。`;

        // 建立臨時 assistant
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

        // 建立對話 thread
        const thread = await openai.beta.threads.create();

        // 新增使用者訊息到 thread
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: transcription.trim()
        });

        // 執行 assistant 並使用串流
        const stream = openai.beta.threads.runs.stream(thread.id, {
            assistant_id: assistant.id
        });

        let fullResponse = '';

        // 處理串流事件
        stream.on('textDelta', (textDelta) => {
            const chunk = textDelta.value || '';
            fullResponse += chunk;
            sendSSEEvent(res, 'ai_response_chunk', { chunk });
        });

        stream.on('messageDone', async () => {
            // 發送完成事件
            sendSSEEvent(res, 'ai_response_complete', {
                fullResponse,
                question: transcription.trim(),
                mode
            });

            // 清理資源
            try {
                await Promise.all([
                    openai.beta.assistants.del(assistant.id),
                    openai.beta.threads.del(thread.id)
                ]);
            } catch (cleanupError) {
                console.warn('Cleanup warning:', cleanupError.message);
            }

            res.end();
        });

        stream.on('error', (error) => {
            console.error('Stream error:', error);
            sendSSEEvent(res, 'error', { error: 'AI 回應過程中發生錯誤' });
            res.end();
        });

    } catch (error) {
        console.error('Voice Ask API Error:', error);
        sendSSEEvent(res, 'error', {
            error: '語音處理失敗',
            details: error.message
        });
        res.end();
    }
}

/**
 * 發送 SSE 事件
 */
function sendSSEEvent(res, type, data) {
    const eventData = JSON.stringify({ type, ...data, timestamp: new Date().toISOString() });
    res.write(`data: ${eventData}\n\n`);
}
