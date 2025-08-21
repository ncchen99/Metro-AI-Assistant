# Metro AI Assistant - 分離式部署指南

這個指南將幫助你將捷境 MetroSense進行前後端分離部署：
- **前端**: Vercel (React + Vite)
- **後端**: Render (Python FastAPI)

## 📋 部署前檢查清單

### 1. 確認檔案結構
```
metro-ai-assistant/
├── api/
│   ├── main.py           # ✅ FastAPI 後端主檔案
│   └── requirements.txt  # ✅ Python 依賴
├── src/                  # ✅ React 前端源碼
├── dist/                 # ✅ 建置後的前端檔案
├── package.json          # ✅ Node.js 依賴和腳本
├── vercel.json           # ✅ Vercel 前端部署配置
├── render.yaml           # ✅ Render 後端部署配置
├── vite.config.js        # ✅ Vite 配置
└── env.example           # ✅ 環境變數範例
```

### 2. 環境變數設定
你需要一個 OpenAI API 金鑰：
1. 前往 [OpenAI API Keys](https://platform.openai.com/api-keys)
2. 創建新的 API 金鑰
3. 複製金鑰備用

## 🚀 部署步驟

### 第一部分：後端部署到 Render

#### 步驟 1: 準備 Git 存儲庫

```bash
# 確保你在專案根目錄
cd /mnt/c/Users/ncc/Desktop/metro-ai-assistant

# 初始化 Git（如果尚未初始化）
git init

# 添加所有檔案
git add .

# 提交變更
git commit -m "準備分離式部署配置"

# 推送到 GitHub（如果你有 GitHub 存儲庫）
git remote add origin https://github.com/你的用戶名/metro-ai-assistant.git
git push -u origin main
```

#### 步驟 2: 在 Render 部署後端

1. 前往 [Render Dashboard](https://render.com/dashboard)
2. 點擊 "New" > "Web Service"
3. 連接你的 GitHub 存儲庫
4. 設定服務：
   - **Name**: `metro-ai-assistant-api`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r api/requirements.txt`
   - **Start Command**: `cd api && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: `Free` (或根據需要選擇)

#### 步驟 3: 設定 Render 環境變數

在 Render 服務設定中：
1. 前往 "Environment" 標籤
2. 添加環境變數：
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `你的OpenAI API金鑰`

#### 步驟 4: 部署並測試後端

部署完成後，你的 API 將在以下地址可用：
```
https://metro-sense.onrender.com
```

測試健康檢查：
```
GET https://metro-sense.onrender.com/health
```

### 第二部分：前端部署到 Vercel

#### 步驟 5: 部署前端到 Vercel

```bash
# 安裝 Vercel CLI（如果尚未安裝）
npm install -g vercel

# 登入 Vercel
vercel login

# 部署專案（僅前端）
vercel --prod
```

或使用 Vercel Dashboard：
1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 點擊 "Import Project"
3. 從 GitHub 匯入你的存儲庫
4. Vercel 會自動檢測為 React 專案

#### 步驟 6: 確認部署成功

前端將部署在 Vercel 提供的域名，例如：
```
https://metro-sense-xxx.vercel.app
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

部署成功後，你的捷境 MetroSense將可在 Vercel 提供的域名上運行！
