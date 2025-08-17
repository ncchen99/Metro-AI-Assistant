# Metro AI Assistant - Vercel Serverless Functions

台北捷運智能助手的後端 API，部署在 Vercel Serverless Functions 上。

## 🚀 API Endpoints

### 1. 健康檢查 - `/api/health`
- **方法**: GET
- **功能**: 檢查服務狀態
- **回應**:
```json
{
  "status": "ok",
  "timestamp": "2024-08-17T14:50:00.000Z",
  "service": "Metro AI Assistant API"
}
```

### 2. 語音轉文字 - `/api/stt`
- **方法**: POST
- **功能**: 將音訊檔案轉換為文字
- **請求**: multipart/form-data
  - `audio`: 音訊檔案 (支援 mp3, wav, mp4, m4a, webm)
- **回應**:
```json
{
  "success": true,
  "text": "轉錄的文字內容",
  "timestamp": "2024-08-17T14:50:00.000Z"
}
```

### 3. AI 問答 - `/api/ask`
- **方法**: POST
- **功能**: 使用 Assistants API 和 Vector Store 回答問題
- **請求**:
```json
{
  "question": "用戶的問題",
  "mode": "work" // 或 "travel"
}
```
- **回應**:
```json
{
  "success": true,
  "answer": "AI 助手的回答",
  "mode": "work",
  "timestamp": "2024-08-17T14:50:00.000Z",
  "question": "用戶的問題"
}
```

### 4. 語音轉AI問答 (串流版) - `/api/voice-ask`
- **方法**: POST
- **功能**: 語音轉文字 + AI問答的整合 API，使用 Server-Sent Events (SSE) 提供即時回應
- **請求**: multipart/form-data
  - `audio`: 音訊檔案 (支援 mp3, wav, mp4, m4a, webm)
  - `mode`: 模式 (可選，預設為 "work"，支援 "work" 或 "travel")
- **回應**: Server-Sent Events 串流
  - `connected`: 連接建立確認
  - `status`: 處理狀態更新
  - `stt_result`: 語音轉文字結果
  - `ai_response_chunk`: AI 回應片段 (串流)
  - `ai_response_complete`: AI 回應完成
  - `error`: 錯誤訊息

**SSE 事件格式**:
```javascript
data: {"type":"connected","message":"連接已建立","timestamp":"2024-01-01T00:00:00.000Z"}

data: {"type":"status","message":"開始處理語音...","timestamp":"2024-01-01T00:00:00.000Z"}

data: {"type":"stt_result","text":"轉錄的文字","timestamp":"2024-01-01T00:00:00.000Z"}

data: {"type":"ai_response_chunk","chunk":"回應片段","timestamp":"2024-01-01T00:00:00.000Z"}

data: {"type":"ai_response_complete","fullResponse":"完整回應","question":"原始問題","mode":"work","timestamp":"2024-01-01T00:00:00.000Z"}
```

### 5. 語音轉AI問答 (Edge版) - `/api/voice-ask-edge`
- **方法**: POST
- **功能**: 使用 Vercel Edge Runtime 實現的語音轉文字 + AI問答整合 API
- **注意**: Edge Functions 對 multipart/form-data 支援有限制，可能無法正常處理音頻文件
- **請求**: 與 `/api/voice-ask` 相同
- **回應**: 與 `/api/voice-ask` 相同的 SSE 串流格式

### 6. 文字轉語音 - `/api/tts`
- **方法**: POST
- **功能**: 將文字轉換為語音
- **請求**:
```json
{
  "text": "要轉換的文字",
  "voice": "alloy",  // 可選: alloy, echo, fable, onyx, nova, shimmer
  "format": "mp3",   // 可選: mp3, opus, aac, flac
  "speed": 1.0       // 可選: 0.25-4.0
}
```
- **回應**: 音訊檔案 (binary)

## 🔧 環境設定

### 必要環境變數
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Vector Store
- 使用的 Vector Store ID: `vs_68974a0ad7f08191b6de1a5e41a8e01b`
- 包含台北捷運相關資料和 FAQ

## 📦 部署

### 1. 安裝依賴
```bash
npm install
```

### 2. 本地開發
```bash
npm run dev
```

### 3. 部署到 Vercel
```bash
npm run deploy
```

## 🔐 安全性

- 所有 API 都支援 CORS
- 檔案上傳有大小限制 (25MB)
- 文字長度有限制 (4096 字元)
- 自動清理暫存檔案和 OpenAI 資源

## 🎯 特色功能

1. **智能模式切換**: 支援工作模式和旅遊模式
2. **Vector Search**: 使用 OpenAI Assistants API 搭配 Vector Store
3. **即時串流回應**: `/api/voice-ask` 使用 Server-Sent Events 提供即時的語音處理和 AI 回應
4. **語音整合處理**: 一次 API 呼叫完成語音轉文字 + AI 問答的完整流程
5. **多語音選項**: TTS 支援多種語音和格式
6. **錯誤處理**: 完整的錯誤處理和日誌記錄
7. **資源清理**: 自動清理臨時資源，避免費用累積
8. **Edge Runtime 支援**: 提供 Edge Function 版本以獲得更好的效能

## 📋 API 使用範例

### 語音轉AI問答 (Server-Sent Events)

```javascript
// 前端使用 EventSource 接收串流回應
const formData = new FormData();
formData.append('audio', audioFile);
formData.append('mode', 'work');

// 使用 fetch 發送請求
fetch('/api/voice-ask', {
    method: 'POST',
    body: formData
}).then(response => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    function readStream() {
        return reader.read().then(({ done, value }) => {
            if (done) return;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            lines.forEach(line => {
                if (line.startsWith('data: ')) {
                    const data = JSON.parse(line.slice(6));
                    
                    switch(data.type) {
                        case 'connected':
                            console.log('連接已建立');
                            break;
                        case 'status':
                            console.log('狀態:', data.message);
                            break;
                        case 'stt_result':
                            console.log('語音識別結果:', data.text);
                            break;
                        case 'ai_response_chunk':
                            // 即時顯示 AI 回應片段
                            displayChunk(data.chunk);
                            break;
                        case 'ai_response_complete':
                            console.log('完整回應:', data.fullResponse);
                            break;
                        case 'error':
                            console.error('錯誤:', data.error);
                            break;
                    }
                }
            });
            
            return readStream();
        });
    }
    
    readStream();
});
```

### 標準文字問答

```javascript
// 發送文字問題到 AI 助手
fetch('/api/ask', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        question: '從台北車站到信義區要怎麼搭捷運？',
        mode: 'work'
    })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        console.log('AI 回答:', data.answer);
    } else {
        console.error('錯誤:', data.error);
    }
});
```

### 文字轉語音

```javascript
// 將文字轉換為語音檔案
fetch('/api/tts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        text: '歡迎使用台北捷運智能助手',
        voice: 'alloy',
        format: 'mp3',
        speed: 1.0
    })
})
.then(response => response.blob())
.then(audioBlob => {
    // 播放音頻
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
});
```
