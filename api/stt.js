/**
 * Vercel Serverless Function - Speech to Text
 * 語音轉文字 API endpoint
 */

import { OpenAI } from 'openai';
import formidable from 'formidable';
import fs from 'fs';

// 初始化 OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

    try {
        // 解析 multipart/form-data
        const form = formidable({
            maxFileSize: 25 * 1024 * 1024, // 25MB limit
            keepExtensions: true,
        });

        const [fields, files] = await form.parse(req);

        // 檢查是否有音訊檔案
        if (!files.audio || !files.audio[0]) {
            return res.status(400).json({ error: '缺少音訊檔案' });
        }

        const audioFile = files.audio[0];

        // 檢查檔案類型
        const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/webm'];
        if (!allowedTypes.includes(audioFile.mimetype) &&
            !audioFile.originalFilename?.match(/\.(mp3|wav|mp4|m4a|webm)$/i)) {
            return res.status(400).json({ error: '不支援的音訊格式' });
        }

        // 讀取音訊檔案
        const audioBuffer = fs.readFileSync(audioFile.filepath);

        // 建立 File 物件用於 OpenAI API
        const file = new File([audioBuffer], audioFile.originalFilename || 'audio.mp3', {
            type: audioFile.mimetype || 'audio/mpeg'
        });

        // 呼叫 OpenAI STT API
        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            language: 'zh', // 指定中文
            response_format: 'text'
        });

        // 清理暫存檔案
        fs.unlinkSync(audioFile.filepath);

        // 回傳轉錄結果
        res.status(200).json({
            success: true,
            text: transcription,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('STT Error:', error);

        // 回傳錯誤訊息
        res.status(500).json({
            success: false,
            error: '語音轉文字失敗',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
