# Metro AI Assistant - FastAPI Python 版本

捷境 MetroSense的 Python 後端 API，使用 FastAPI 框架開發，部署在 Vercel 上。

## 🚀 API 端點

### 1. 健康檢查 - `/health`
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

### 2. 語音轉文字 - `/stt`
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

### 3. AI 問答 - `/ask`
- **方法**: POST
- **功能**: 使用 OpenAI GPT 模型回答問題
- **請求**:
```json
{
  "question": "用戶的問題",
  "mode": "work"
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

### 4. 語音轉AI問答 (串流版) - `/voice-ask`
- **方法**: POST
- **功能**: 語音轉文字 + AI問答的整合 API，使用 Server-Sent Events (SSE) 提供即時回應
- **請求**: multipart/form-data
  - `audio`: 音訊檔案 (支援 mp3, wav, mp4, m4a, webm)
  - `mode`: 模式 (可選，預設為 "work"，支援 "work" 或 "travel")
- **回應**: Server-Sent Events 串流

### 5. 文字轉語音 - `/tts`
- **方法**: POST
- **功能**: 將文字轉換為語音
- **請求**:
```json
{
  "text": "要轉換的文字",
  "voice": "alloy",
  "format": "mp3",
  "speed": 1.0
}
```
- **回應**: 音訊檔案 (binary)

## 🔧 環境設定

### 必要環境變數
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 本地開發設定

1. **安裝 Python 依賴**:
```bash
pip install -r requirements.txt
```

2. **設定環境變數**:
```bash
cp env.example .env
# 編輯 .env 檔案，填入你的 OpenAI API 金鑰
```

3. **啟動開發伺服器**:
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

4. **測試 API**:
- 瀏覽器開啟 http://localhost:8000/docs 查看 Swagger UI
- 或訪問 http://localhost:8000/health 進行健康檢查

## 📦 部署到 Vercel

### 1. 準備部署檔案
確保專案根目錄包含以下檔案：
- `main.py` - 主要應用程式
- `requirements.txt` - Python 依賴
- `vercel.json` - Vercel 配置

### 2. 部署步驟

**使用 Vercel CLI (推薦)**:
```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入 Vercel
vercel login

# 部署
vercel --prod
```

**或使用 Git 部署**:
1. 推送程式碼到 GitHub
2. 在 Vercel 控制台連接 GitHub 儲存庫
3. 設定環境變數 `OPENAI_API_KEY`
4. 部署

### 3. 環境變數設定
在 Vercel 控制台的環境變數頁面設定：
- `OPENAI_API_KEY`: 你的 OpenAI API 金鑰

## 🔐 安全性

- 所有 API 都支援 CORS
- 檔案上傳有大小限制 (25MB)
- 文字長度有限制 (4096 字元)
- 自動清理暫存檔案

## 🎯 技術特色

1. **FastAPI 框架**: 高效能、自動文件生成
2. **異步處理**: 支援高並發請求
3. **串流回應**: SSE 提供即時的語音處理和 AI 回應
4. **OpenAI 整合**: Whisper (STT) + GPT (Chat) + TTS
5. **檔案處理**: 安全的臨時檔案管理
6. **錯誤處理**: 完整的異常處理機制
7. **Vercel 優化**: 專為 Serverless 部署優化

## 🔄 從 Node.js 版本遷移

### 主要差異
1. **框架變更**: Express.js → FastAPI
2. **語言變更**: JavaScript → Python
3. **SSE 實現**: 使用 FastAPI StreamingResponse
4. **檔案處理**: Python tempfile 模組
5. **OpenAI 客戶端**: JavaScript SDK → Python SDK

### 前端相容性
API 端點和回應格式保持一致，前端程式碼無需大幅修改。

## 📋 API 使用範例

### 語音轉AI問答 (Python)
```python
import requests

# 上傳音訊檔案
with open('audio.mp3', 'rb') as f:
    files = {'audio': f}
    data = {'mode': 'work'}
    
    response = requests.post(
        'http://localhost:8000/voice-ask',
        files=files,
        data=data,
        stream=True
    )
    
    for line in response.iter_lines():
        if line.startswith(b'data: '):
            print(line.decode('utf-8'))
```

### 健康檢查
```python
import requests

response = requests.get('http://localhost:8000/health')
print(response.json())
```

## 🚨 常見問題

### 1. 部署失敗
- 確認 `requirements.txt` 中的版本相容性
- 檢查 Vercel 環境變數是否正確設定

### 2. OpenAI API 錯誤
- 確認 API 金鑰有效且有足夠額度
- 檢查網路連接

### 3. 檔案上傳問題
- 確認檔案格式支援 (mp3, wav, mp4, m4a, webm)
- 檢查檔案大小是否超過 25MB

## 📞 支援

如果遇到問題，請檢查：
1. Python 版本 (建議 3.8+)
2. 依賴安裝是否完整
3. 環境變數設定
4. Vercel 部署日誌
