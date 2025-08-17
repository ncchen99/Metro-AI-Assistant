# Metro AI Assistant - Vercel 部署指南

這個指南將幫助你將台北捷運智能助手部署到 Vercel 平台。

## 📋 部署前檢查清單

### 1. 確認檔案結構
```
metro-ai-assistant/
├── api/
│   ├── index.py          # ✅ Vercel Serverless Function 入口點
│   ├── main.py           # 🔸 原始 FastAPI 檔案 (保留作為參考)
│   └── requirements.txt  # ✅ Python 依賴
├── src/                  # ✅ React 前端源碼
├── dist/                 # ✅ 建置後的前端檔案
├── package.json          # ✅ Node.js 依賴和腳本
├── vercel.json           # ✅ Vercel 部署配置
├── vite.config.js        # ✅ Vite 配置 (含 API 代理)
└── env.example           # ✅ 環境變數範例
```

### 2. 環境變數設定
你需要一個 OpenAI API 金鑰：
1. 前往 [OpenAI API Keys](https://platform.openai.com/api-keys)
2. 創建新的 API 金鑰
3. 複製金鑰備用

## 🚀 部署步驟

### 步驟 1: 準備 Git 存儲庫

```bash
# 確保你在專案根目錄
cd /mnt/c/Users/ncc/Desktop/metro-ai-assistant

# 初始化 Git（如果尚未初始化）
git init

# 添加所有檔案
git add .

# 提交變更
git commit -m "準備 Vercel 部署配置"

# 推送到 GitHub（如果你有 GitHub 存儲庫）
git remote add origin https://github.com/你的用戶名/metro-ai-assistant.git
git push -u origin main
```

### 步驟 2: 部署到 Vercel

#### 方法 A: 使用 Vercel CLI（推薦）

```bash
# 安裝 Vercel CLI（如果尚未安裝）
npm install -g vercel

# 登入 Vercel
vercel login

# 部署專案
vercel

# 按照提示進行：
# - 設定專案名稱
# - 選擇團隊（如果有）
# - 確認設定
```

#### 方法 B: 使用 Vercel Dashboard

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 點擊 "Import Project"
3. 從 GitHub 匯入你的存儲庫
4. Vercel 會自動檢測配置

### 步驟 3: 設定環境變數

在 Vercel Dashboard 中：

1. 前往你的專案設定
2. 點擊 "Settings" > "Environment Variables"
3. 添加以下環境變數：
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `你的OpenAI API金鑰`
   - **Environment**: `Production`, `Preview`, `Development` (全選)

### 步驟 4: 重新部署

設定環境變數後，觸發重新部署：
```bash
vercel --prod
```

## 🔧 配置說明

### 前端配置 (React + Vite)
- **建置命令**: `npm run build`
- **輸出目錄**: `dist/`
- **開發代理**: API 請求代理到 `localhost:3001`

### 後端配置 (FastAPI + Serverless)
- **運行時**: Python 3.9
- **入口點**: `api/index.py`
- **路由**: `/api/*` 對應到 Serverless Function
- **依賴**: `api/requirements.txt`

### API 端點
部署後，你的 API 將可通過以下端點訪問：
- `https://你的域名.vercel.app/api/health` - 健康檢查
- `https://你的域名.vercel.app/api/ask` - AI 問答
- `https://你的域名.vercel.app/api/stt` - 語音轉文字
- `https://你的域名.vercel.app/api/tts` - 文字轉語音
- `https://你的域名.vercel.app/api/voice-ask` - 語音問答

## 🔍 疑難排解

### 常見問題

1. **部署失敗**
   - 檢查 `vercel.json` 配置
   - 確認 `api/requirements.txt` 格式正確
   - 查看 Vercel 部署日誌

2. **API 500 錯誤**
   - 確認 `OPENAI_API_KEY` 環境變數已正確設定
   - 檢查 OpenAI API 配額

3. **前端無法連接後端**
   - 確認 API 路由配置正確
   - 檢查 CORS 設定

### 本地開發

```bash
# 安裝依賴
npm install

# 啟動前端開發服務器
npm run dev

# 啟動 API 開發服務器（另一個終端）
npm run dev:api
```

前端: http://localhost:5173
API: http://localhost:3001

## 📞 支援

如果遇到問題：
1. 檢查 Vercel 部署日誌
2. 確認環境變數設定
3. 檢查 API 金鑰有效性

## 🎉 完成！

部署成功後，你的台北捷運智能助手將可在 Vercel 提供的域名上運行！
