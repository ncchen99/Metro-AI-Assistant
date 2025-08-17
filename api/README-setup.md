# 🚀 Metro AI Assistant - 快速設定指南

## 📋 環境設定步驟

### 方法一：使用設定腳本（推薦）

1. **執行設定腳本**：
```bash
python setup_env.py
```

2. **輸入您的 OpenAI API 金鑰**：
   - 在 https://platform.openai.com/api-keys 獲取 API 金鑰
   - 金鑰格式應該是 `sk-xxxxxxxxxx...`

3. **啟動伺服器**：
```bash
python start.py
```

### 方法二：手動設定

1. **複製環境檔案**：
```bash
cp env_example.txt .env
```

2. **編輯 .env 檔案**：
```bash
# 使用您喜歡的編輯器
nano .env
# 或
code .env
```

3. **設定 API 金鑰**：
```
OPENAI_API_KEY=sk-your_actual_api_key_here
```

4. **啟動伺服器**：
```bash
python start.py
```

### 方法三：環境變數

直接設定環境變數：
```bash
export OPENAI_API_KEY="sk-your_actual_api_key_here"
python start.py
```

## 🔍 故障排除

### 問題：Python 無法讀取 .env 檔案

**原因**：缺少 `python-dotenv` 依賴或 `.env` 檔案路徑不正確

**解決方法**：
1. 確保安裝依賴：
```bash
pip install -r requirements.txt
```

2. 確保 `.env` 檔案在專案根目錄：
```
metro-ai-assistant/
├── main.py
├── .env          ← 應該在這裡
├── requirements.txt
└── ...
```

3. 檢查 `.env` 檔案內容格式：
```
OPENAI_API_KEY=sk-your_key_here
# 注意：等號前後不要有空格
```

### 問題：環境變數未載入

**檢查步驟**：
1. 執行測試：
```bash
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('API Key:', os.getenv('OPENAI_API_KEY', 'NOT_FOUND'))"
```

2. 如果顯示 `NOT_FOUND`，檢查：
   - `.env` 檔案是否存在
   - 檔案內容是否正確
   - 是否有拼寫錯誤

### 問題：FastAPI 啟動時報錯

**常見錯誤**：
```
OPENAI_API_KEY 環境變數未設定！
```

**解決方法**：
1. 使用設定腳本：`python setup_env.py`
2. 或手動檢查 `.env` 檔案

## 📱 測試 API

1. **健康檢查**：
```bash
curl http://localhost:8000/health
```

2. **API 文件**：
   瀏覽器開啟 http://localhost:8000/docs

3. **完整測試**：
```bash
python test_api.py
```

## 🌐 部署到 Vercel

在 Vercel 控制台設定環境變數：
- `OPENAI_API_KEY`: 您的 OpenAI API 金鑰

```bash
vercel --prod
```

## 📞 需要幫助？

如果遇到問題：
1. 檢查 Python 版本（建議 3.8+）
2. 確認所有依賴已安裝：`pip install -r requirements.txt`
3. 檢查 OpenAI API 金鑰是否有效
4. 查看錯誤日誌獲取詳細資訊

