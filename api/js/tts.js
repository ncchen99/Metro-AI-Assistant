/**
 * Vercel Serverless Function - Text to Speech
 * 文字轉語音 API endpoint
 */

import { OpenAI } from 'openai';

// 初始化 OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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
        const {
            text,
            voice = 'alloy',  // 預設語音
            format = 'mp3',   // 預設格式
            speed = 1.0       // 預設語速
        } = req.body;

        // 檢查是否有文字
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                error: '請提供有效的文字內容',
                success: false
            });
        }

        // 檢查文字長度限制 (OpenAI TTS 限制 4096 字元)
        if (text.length > 4096) {
            return res.status(400).json({
                error: '文字長度超過限制 (最多 4096 字元)',
                success: false
            });
        }

        // 驗證語音選項
        const validVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
        if (!validVoices.includes(voice)) {
            return res.status(400).json({
                error: `無效的語音選項。可用選項: ${validVoices.join(', ')}`,
                success: false
            });
        }

        // 驗證格式選項
        const validFormats = ['mp3', 'opus', 'aac', 'flac'];
        if (!validFormats.includes(format)) {
            return res.status(400).json({
                error: `無效的音訊格式。可用格式: ${validFormats.join(', ')}`,
                success: false
            });
        }

        // 驗證語速
        if (speed < 0.25 || speed > 4.0) {
            return res.status(400).json({
                error: '語速必須在 0.25 到 4.0 之間',
                success: false
            });
        }

        console.log(`Generating TTS for text: ${text.substring(0, 50)}...`);

        // 呼叫 OpenAI TTS API
        const response = await openai.audio.speech.create({
            model: 'tts-1',
            voice: voice,
            input: text,
            response_format: format,
            speed: speed
        });

        // 取得音訊資料
        const audioBuffer = Buffer.from(await response.arrayBuffer());

        // 設定 Content-Type
        const contentTypes = {
            mp3: 'audio/mpeg',
            opus: 'audio/opus',
            aac: 'audio/aac',
            flac: 'audio/flac'
        };

        // 設定回應標頭
        res.setHeader('Content-Type', contentTypes[format]);
        res.setHeader('Content-Length', audioBuffer.length);
        res.setHeader('Content-Disposition', `attachment; filename="speech.${format}"`);

        // 回傳音訊檔案
        res.status(200).send(audioBuffer);

    } catch (error) {
        console.error('TTS Error:', error);

        // 回傳錯誤訊息
        res.status(500).json({
            success: false,
            error: '文字轉語音失敗',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
