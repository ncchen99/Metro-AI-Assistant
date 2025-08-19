# 🚇 台北捷運智能助手 (Metro AI Assistant)
## hi
<div align="center">

![Demo](docs/images/demo.png)

**革命性的智能交通助手，為您的台北捷運之旅提供個性化AI體驗**

[![Frontend](https://img.shields.io/badge/Frontend-metro--sense.vercel.app-blue?style=for-the-badge&logo=vercel)](https://metro-sense.vercel.app)
[![Backend API (Fly.io)](https://img.shields.io/badge/Backend-metro--sense.fly.dev-purple?style=for-the-badge&logo=fastapi)](https://metro-sense.fly.dev/docs)
[![Backup API (Render)](https://img.shields.io/badge/Backup-metro--sense.onrender.com-green?style=for-the-badge&logo=fastapi)](https://metro-sense.onrender.com/docs)

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat&logo=openai&logoColor=white)](https://openai.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

## 📋 目錄

- [🌟 專案介紹](#-專案介紹)
- [✨ 主要功能](#-主要功能)
- [🛠️ 技術架構](#️-技術架構)
- [🚀 快速開始](#-快速開始)
- [📚 API 文檔](#-api-文檔)
- [🌐 部署資訊](#-部署資訊)
- [🔧 開發指南](#-開發指南)
- [📄 授權條款](#-授權條款)

## 🌟 專案介紹

台北捷運智能助手是一個結合人工智慧技術的智能交通服務平台，專為台北捷運系統設計。透過先進的OpenAI技術整合，提供用戶個性化的交通規劃、景點推薦和即時資訊查詢服務。

### 🎯 專案目標

- **智能化交通規劃**: 利用AI提供最佳路線建議
- **個性化服務體驗**: 根據用戶需求切換工作/旅遊模式
- **語音互動功能**: 支援語音輸入和語音回應
- **即時資訊整合**: 提供最新的捷運營運資訊

## ✨ 主要功能

### 🤖 AI 智能助手
- **雙模式切換**: 工作模式專注通勤需求，旅遊模式提供景點推薦
- **自然語言處理**: 理解複雜的中文查詢需求
- **個性化回應**: 根據用戶偏好提供客製化建議

### 🗣️ 語音互動系統
- **語音轉文字** (STT): 支援多種音訊格式 (mp3, wav, mp4, m4a, webm)
- **文字轉語音** (TTS): 多種語音選項和音質設定
- **即時串流回應**: 使用 Server-Sent Events 提供流暢的對話體驗

### 🎨 現代化介面設計
- **響應式設計**: 適配各種裝置尺寸
- **流暢動畫效果**: 使用 Framer Motion 提供順滑的使用者體驗
- **直觀操作介面**: 簡潔美觀的UI/UX設計

### 🔗 智能路線規劃
- **即時交通資訊**: 整合捷運營運狀態
- **多元路線建議**: 提供多種可選路線方案
- **景點推薦系統**: 基於位置的智能推薦

## 🛠️ 技術架構

### 前端技術棧
```javascript
- React 18.3.1          // 現代化前端框架
- Vite 7.1.2            // 快速建置工具
- Tailwind CSS 3.4.10   // 實用工具優先的CSS框架
- Framer Motion 12.23.12 // 動畫和手勢庫
- React Router 6.26.1    // 單頁應用路由
```

### 後端技術棧
```python
- FastAPI               // 高效能Python Web框架
- OpenAI API 4.67.3     // AI語言模型整合
- Uvicorn              // ASGI伺服器
- Python 3.11+         // 現代Python版本
```

### 部署架構
```yaml
Frontend:    Vercel           # 靜態網站託管
Backend:     Fly.io (主要)    # 容器化部署，全球CDN
Backup:      Render (備用)    # Python應用部署
API:         RESTful + SSE    # 即時通訊協定
Failover:    自動容錯切換     # 智能後端選擇
```

## 🚀 快速開始

### 前置需求
- Node.js >= 18
- Python >= 3.11
- OpenAI API Key

### 1. 專案設定

```bash
# 複製專案
git clone https://github.com/你的用戶名/metro-ai-assistant.git
cd metro-ai-assistant

# 安裝前端依賴
npm install

# 安裝後端依賴
pip install -r api/requirements.txt
```

### 2. 環境變數配置

建立 `.env` 檔案：
```bash
# OpenAI API 配置
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 本地開發

**啟動後端服務** (終端機 1):
```bash
npm run dev:api
# API 將在 http://localhost:3001 運行
```

**啟動前端服務** (終端機 2):
```bash
npm run dev
# 前端將在 http://localhost:5173 運行
```

### 4. 測試 API
```bash
npm test
```

## 📚 API 文檔

### 🔍 API 端點概覽

| 端點 | 方法 | 功能 | 說明 |
|------|------|------|------|
| `/api/health` | GET | 健康檢查 | 檢查服務狀態 |
| `/api/stt` | POST | 語音轉文字 | 音訊檔案轉文字 |
| `/api/ask` | POST | AI 問答 | 智能問答服務 |
| `/api/voice-ask` | POST | 語音問答 | 整合語音+AI問答 |
| `/api/tts` | POST | 文字轉語音 | 文字轉音訊檔案 |

### 🤖 AI 問答 API

**端點**: `POST /api/ask`

**請求格式**:
```json
{
  "question": "從台北車站到101要怎麼搭？",
  "mode": "work"  // "work" 或 "travel"
}
```

**回應格式**:
```json
{
  "success": true,
  "answer": "從台北車站到台北101，建議路線如下...",
  "mode": "work",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "question": "從台北車站到101要怎麼搭？"
}
```

### 🗣️ 語音轉AI問答 API

**端點**: `POST /api/voice-ask`

**請求格式**: `multipart/form-data`
- `audio`: 音訊檔案
- `mode`: 模式選擇 (可選)

**回應格式**: Server-Sent Events (SSE)
```javascript
// 連接確認
data: {"type":"connected","message":"連接已建立"}

// 語音轉文字結果
data: {"type":"stt_result","text":"轉錄的文字"}

// AI回應片段 (串流)
data: {"type":"ai_response_chunk","chunk":"回應片段"}

// 完整回應
data: {"type":"ai_response_complete","fullResponse":"完整AI回應"}
```

## 🌐 部署資訊

### 線上服務

| 服務 | 網址 | 狀態 | 說明 |
|------|------|------|------|
| **前端應用** | [metro-sense.vercel.app](https://metro-sense.vercel.app) | 🟢 運行中 | React 前端應用 |
| **主要後端API** | [metro-sense.fly.dev](https://metro-sense.fly.dev/docs) | 🟢 運行中 | Fly.io 容器化部署 |
| **備用後端API** | [metro-sense.onrender.com](https://metro-sense.onrender.com/docs) | 🟡 備用 | Render Python 部署 |

### 🔄 自動容錯切換機制

前端應用具備智能後端選擇功能：
- **主要服務**: 優先使用 Fly.io (更快的全球 CDN)
- **自動檢測**: 1秒內檢測主要服務可用性
- **無縫切換**: 主要服務不可用時自動切換到 Render
- **透明體驗**: 用戶無感知的服務切換

### 部署指令

#### 前端部署到 Vercel
```bash
npm run deploy
```

#### 後端部署選項

**選項 1: 部署到 Fly.io (推薦)**
```bash
# 使用自動化部署腳本
./deploy-fly.sh

# 或手動部署
fly launch --no-deploy
fly secrets set OPENAI_API_KEY="your_api_key"
fly deploy
```

**選項 2: 部署到 Render (備用)**
- 連接 GitHub 存儲庫
- 設定環境變數 `OPENAI_API_KEY`
- 自動部署

### 📚 詳細指南

- **Fly.io 部署**: 請參考 [FLY-DEPLOYMENT.md](FLY-DEPLOYMENT.md)
- **Render 部署**: 請參考 [DEPLOYMENT.md](DEPLOYMENT.md)

### 🔧 服務比較

| 功能 | Fly.io | Render |
|------|--------|--------|
| **冷啟動時間** | < 1秒 | 10-30秒 |
| **全球分佈** | ✅ 多區域 | ❌ 單一區域 |
| **自動縮放** | ✅ 即時 | ✅ 基本 |
| **免費額度** | 3個共享CPU應用 | 750小時/月 |
| **容器支援** | ✅ 完整Docker | ⚠️ 有限制 |
| **持久化存儲** | ✅ Volumes | ❌ 無 |

## 🔧 開發指南

### 專案結構
```
metro-ai-assistant/
├── api/                    # 後端 FastAPI 應用
│   ├── main.py            # 主應用程式
│   ├── requirements.txt    # Python 依賴
│   └── js/                # Node.js 版本 (備用)
├── src/                   # 前端 React 應用
│   ├── components/        # 可重用元件
│   ├── pages/            # 頁面元件
│   ├── hooks/            # 自定義 Hooks
│   ├── services/         # API 服務
│   └── contexts/         # React Contexts
├── docs/                 # 文檔和圖片
├── public/               # 靜態資源
├── dist/                 # 建置輸出
└── test/                 # 測試檔案
```

### 開發建議

1. **程式碼風格**: 遵循 ESLint 和 Prettier 設定
2. **提交訊息**: 使用語義化提交訊息
3. **分支策略**: 使用 Git Flow 工作流程
4. **測試覆蓋**: 維持適當的測試覆蓋率

### 技術特色

- **🚀 高效能**: Vite 快速建置，FastAPI 高效後端
- **📱 響應式**: 支援桌面和行動裝置
- **🔄 即時互動**: SSE 串流技術提供即時回應
- **🛡️ 安全性**: CORS 設定，檔案大小限制
- **♿ 無障礙**: 遵循 WCAG 指導原則
- **🔄 智能容錯**: 自動後端切換，99.9% 服務可用性
- **🌍 全球加速**: Fly.io CDN 提供最佳延遲體驗
- **📊 服務監控**: 即時健康檢查和狀態監控

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

---

<div align="center">

**🚇 讓每一次出行都變得更加便捷高效！**

Made with ❤️ for Taipei Metro users

[回到頂部](#-台北捷運智能助手-metro-ai-assistant)

</div>
