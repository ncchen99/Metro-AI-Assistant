/**
 * API Service - 呼叫後端 API 的統一服務
 */

// API 基本 URL - 如果在本地開發可以改為 http://localhost:8000 (Python FastAPI)
// 生產環境會自動使用相對路徑
const API_BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'  // Python FastAPI 開發伺服器
    : '';  // 生產環境使用相對路徑

/**
 * 健康檢查 API
 */
export const healthCheck = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Health check failed:', error);
        return { success: false, error: error.message };
    }
};

/**
 * 語音轉文字 API
 * @param {File} audioFile - 音訊檔案
 */
export const speechToText = async (audioFile) => {
    try {
        const formData = new FormData();
        formData.append('audio', audioFile);

        const response = await fetch(`${API_BASE_URL}/stt`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || '語音轉文字失敗');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Speech to text failed:', error);
        return { success: false, error: error.message };
    }
};

/**
 * AI 問答 API (使用 SSE 串流)
 * @param {string} question - 用戶問題
 * @param {string} mode - 模式 ('work' 或 'travel')
 * @param {Object} callbacks - 回調函數
 * @param {Function} callbacks.onStatus - 狀態更新回調
 * @param {Function} callbacks.onAIChunk - AI回應片段回調
 * @param {Function} callbacks.onComplete - 完成回調
 * @param {Function} callbacks.onError - 錯誤回調
 */
export const askAI = async (question, mode = 'work', callbacks = {}) => {
    try {
        // 檢查問題是否為空
        if (!question || !question.trim()) {
            throw new Error('問題不能為空');
        }

        if (question.length > 4096) {
            throw new Error('問題長度不能超過 4096 字元');
        }

        console.log('Sending AI question:', {
            question: question,
            mode: mode
        });

        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question,
                mode,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`AI 問答請求失敗 (${response.status}): ${errorText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            // 將新數據加入緩衝區
            buffer += decoder.decode(value, { stream: true });

            // 處理完整的行
            const lines = buffer.split('\n');

            // 保留最後一個可能不完整的行
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ') && line.trim() !== 'data: ') {
                    try {
                        const jsonStr = line.slice(6).trim();
                        if (jsonStr) {
                            const data = JSON.parse(jsonStr);

                            console.log('AI SSE data received:', data.type, data);

                            switch (data.type) {
                                case 'connected':
                                    console.log('Connected to AI SSE:', data.message);
                                    callbacks.onStatus?.(data.message);
                                    break;
                                case 'status':
                                    callbacks.onStatus?.(data.message);
                                    break;
                                case 'ai_response_chunk':
                                    callbacks.onAIChunk?.(data.chunk);
                                    break;
                                case 'ai_response_complete':
                                    callbacks.onComplete?.(data);
                                    break;
                                case 'error':
                                    console.error('AI SSE Error:', data.error);
                                    callbacks.onError?.(data.error, data.details);
                                    return { success: false, error: data.error };
                            }
                        }
                    } catch (parseError) {
                        console.warn('Failed to parse AI SSE data:', parseError, 'Line:', line);
                    }
                }
            }
        }

        // 處理緩衝區中剩餘的數據
        if (buffer.trim()) {
            console.log('Remaining AI buffer data:', buffer);
        }

        return { success: true };
    } catch (error) {
        console.error('AI ask failed:', error);
        callbacks.onError?.(error.message);
        return { success: false, error: error.message };
    }
};

/**
 * 語音輸入轉AI問答 API (使用 SSE 串流)
 * @param {File} audioFile - 音訊檔案
 * @param {string} mode - 模式 ('work' 或 'travel')
 * @param {Object} callbacks - 回調函數
 * @param {Function} callbacks.onStatus - 狀態更新回調
 * @param {Function} callbacks.onSTTResult - STT結果回調
 * @param {Function} callbacks.onAIChunk - AI回應片段回調
 * @param {Function} callbacks.onComplete - 完成回調
 * @param {Function} callbacks.onError - 錯誤回調
 */
export const voiceToAI = async (audioFile, mode = 'work', callbacks = {}) => {
    try {
        // 檢查音訊檔案
        if (!audioFile || audioFile.size === 0) {
            throw new Error('音訊檔案無效或為空');
        }

        if (audioFile.size > 25 * 1024 * 1024) {
            throw new Error('音訊檔案大小不能超過 25MB');
        }

        const formData = new FormData();
        formData.append('audio', audioFile);
        formData.append('mode', mode);

        console.log('Sending voice request:', {
            fileName: audioFile.name,
            fileSize: audioFile.size,
            fileType: audioFile.type,
            mode: mode
        });

        const response = await fetch(`${API_BASE_URL}/voice-ask`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`語音請求失敗 (${response.status}): ${errorText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            // 將新數據加入緩衝區
            buffer += decoder.decode(value, { stream: true });

            // 處理完整的行
            const lines = buffer.split('\n');

            // 保留最後一個可能不完整的行
            buffer = lines.pop() || '';

            for (const line of lines) {
                if (line.startsWith('data: ') && line.trim() !== 'data: ') {
                    try {
                        const jsonStr = line.slice(6).trim();
                        if (jsonStr) {
                            const data = JSON.parse(jsonStr);

                            console.log('SSE data received:', data.type, data);

                            switch (data.type) {
                                case 'connected':
                                    console.log('Connected to FastAPI SSE:', data.message);
                                    callbacks.onStatus?.(data.message);
                                    break;
                                case 'status':
                                    callbacks.onStatus?.(data.message);
                                    break;
                                case 'stt_result':
                                    callbacks.onSTTResult?.(data.text);
                                    break;
                                case 'ai_response_chunk':
                                    callbacks.onAIChunk?.(data.chunk);
                                    break;
                                case 'ai_response_complete':
                                    callbacks.onComplete?.(data);
                                    break;
                                case 'error':
                                    console.error('SSE Error:', data.error);
                                    callbacks.onError?.(data.error, data.details);
                                    return { success: false, error: data.error };
                            }
                        }
                    } catch (parseError) {
                        console.warn('Failed to parse SSE data:', parseError, 'Line:', line);
                    }
                }
            }
        }

        // 處理緩衝區中剩餘的數據
        if (buffer.trim()) {
            console.log('Remaining buffer data:', buffer);
        }

        return { success: true };
    } catch (error) {
        console.error('Voice to AI failed:', error);
        callbacks.onError?.(error.message);
        return { success: false, error: error.message };
    }
};

/**
 * 文字轉語音 API
 * @param {string} text - 要轉換的文字
 * @param {string} voice - 語音選項 (預設: 'alloy')
 * @param {string} format - 音訊格式 (預設: 'mp3')
 * @param {number} speed - 語速 (預設: 1.0)
 */
export const textToSpeech = async (text, voice = 'alloy', format = 'mp3', speed = 1.0) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                voice,
                format,
                speed,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '文字轉語音失敗');
        }

        // 返回音訊 blob
        const audioBlob = await response.blob();
        return { success: true, data: audioBlob };
    } catch (error) {
        console.error('Text to speech failed:', error);
        return { success: false, error: error.message };
    }
};

/**
 * 錄音相關工具函數
 */
export class AudioRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.stream = null;
    }

    /**
     * 開始錄音
     */
    async startRecording() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.start();
            return { success: true };
        } catch (error) {
            console.error('Failed to start recording:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 停止錄音並返回音訊檔案
     */
    async stopRecording() {
        return new Promise((resolve) => {
            if (!this.mediaRecorder) {
                resolve({ success: false, error: '沒有進行中的錄音' });
                return;
            }

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
                const audioFile = new File([audioBlob], 'recording.mp3', { type: 'audio/mp3' });

                // 停止所有音訊軌道
                if (this.stream) {
                    this.stream.getTracks().forEach(track => track.stop());
                }

                resolve({ success: true, data: audioFile });
            };

            this.mediaRecorder.stop();
        });
    }

    /**
     * 檢查瀏覽器是否支援錄音
     */
    static isSupported() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
}
