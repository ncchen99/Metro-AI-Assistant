# 設定指南

## 環境變數設定

請在專案根目錄建立 `.env` 檔案：

```bash
# .env
OPENAI_API_KEY=your_openai_api_key_here
```

## 本地開發

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動 API 伺服器
```bash
npm run dev:api
```
API 將在 http://localhost:3001 上運行

### 3. 啟動前端 (另一個終端)
```bash
npm run dev
```
前端將在 http://localhost:5173 上運行

### 4. 測試 API
```bash
npm test
```

## Vercel 部署

### 1. 安裝 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登入 Vercel
```bash
vercel login
```

### 3. 設定環境變數
在 Vercel Dashboard 的 Project Settings > Environment Variables 中添加：
- `OPENAI_API_KEY`: 您的 OpenAI API Key

### 4. 部署
```bash
npm run deploy
```

## API Endpoints

- `GET /api/health` - 健康檢查
- `POST /api/ask` - AI 問答
- `POST /api/stt` - 語音轉文字
- `POST /api/tts` - 文字轉語音

詳細 API 文件請參考 `api/README.md`
