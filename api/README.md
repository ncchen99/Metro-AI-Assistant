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

### 4. 文字轉語音 - `/api/tts`
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
3. **多語音選項**: TTS 支援多種語音和格式
4. **錯誤處理**: 完整的錯誤處理和日誌記錄
5. **資源清理**: 自動清理臨時資源，避免費用累積
