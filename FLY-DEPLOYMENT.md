# Fly.io 部署指南

本指南說明如何將 Metro AI Assistant API 部署到 Fly.io 平台。

## 📋 前置需求

1. **安裝 Fly CLI**
   ```bash
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   
   # Windows (PowerShell)
   pwsh -c "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **註冊並登入 Fly.io**
   ```bash
   fly auth signup  # 註冊新帳號
   fly auth login   # 登入現有帳號
   ```

3. **準備環境變數**
   - 確保您有有效的 OpenAI API Key
   - 可以設定環境變數或稍後透過 Fly.io 設定

## 🚀 快速部署

### 方法一：使用部署腳本 (推薦)

```bash
# 設定環境變數 (可選)
export OPENAI_API_KEY="your_openai_api_key_here"

# 執行部署腳本
./deploy-fly.sh
```

### 方法二：手動部署

1. **首次部署**
   ```bash
   fly launch --no-deploy
   ```

2. **設定環境變數**
   ```bash
   fly secrets set OPENAI_API_KEY="your_openai_api_key_here"
   ```

3. **執行部署**
   ```bash
   fly deploy
   ```

## 🔧 配置說明

### fly.toml 配置重點

- **應用程式名稱**: `metro-sense`
- **區域**: `hkg` (香港，亞洲地區延遲較低)
- **記憶體**: 1GB
- **CPU**: 1 核心 (共享)
- **端口**: 8080
- **健康檢查**: `/health` 端點

### 自動縮放

- **最小實例數**: 0 (節省成本)
- **自動啟動**: 是
- **自動停止**: 是
- **並發限制**: 20 (軟限制)，25 (硬限制)

## 📊 監控與管理

### 常用命令

```bash
# 查看應用程式狀態
fly status

# 查看即時日誌
fly logs

# 查看環境變數
fly secrets list

# 設定環境變數
fly secrets set KEY=VALUE

# 調整實例數量
fly scale count 1

# SSH 連線到容器
fly ssh console

# 查看部署歷史
fly releases

# 回滾到上一個版本
fly releases rollback
```

### 健康檢查

API 提供以下健康檢查端點：
- `GET /health` - 基本健康檢查
- `GET /` - 根路徑重定向到健康檢查

## 🌐 訪問您的 API

部署完成後，您的 API 將可以在以下網址訪問：
- **主要網址**: https://metro-sense.fly.dev
- **健康檢查**: https://metro-sense.fly.dev/health

## 🔄 與其他部署平台的比較

| 功能 | Fly.io | Render | Vercel |
|------|--------|--------|--------|
| 免費額度 | 有 | 有 | 有 |
| 冷啟動時間 | 快 | 中等 | 快 |
| 全球分佈 | 是 | 否 | 是 |
| 容器支援 | 完整 | 有限 | 有限 |
| 資料庫支援 | 內建 | 外部 | 外部 |

## 🛠️ 故障排除

### 常見問題

1. **部署失敗 - 找不到檔案**
   - 確保 Dockerfile 中的路徑正確
   - 檢查 `fly.toml` 中的 dockerfile 路徑

2. **健康檢查失敗**
   - 確認應用程式在端口 8080 上運行
   - 檢查 `/health` 端點是否正常回應

3. **OpenAI API 錯誤**
   - 確認 OPENAI_API_KEY 環境變數已設定
   - 檢查 API Key 是否有效且有足夠額度

4. **記憶體不足**
   - 調整 `fly.toml` 中的 memory 設定
   - 考慮升級到更高規格的機器

### 查看詳細錯誤

```bash
# 查看最近的日誌
fly logs --app metro-sense

# 查看構建日誌
fly logs --app metro-sense --build

# 查看特定時間範圍的日誌
fly logs --since=1h
```

## 💰 成本優化

1. **自動縮放**: 已啟用，應用程式閒置時會自動停止
2. **最小實例數**: 設為 0，完全閒置時不產生費用
3. **記憶體配置**: 根據實際使用情況調整
4. **監控使用量**: 定期檢查 Fly.io 儀表板的使用統計

## 🔐 安全性

1. **HTTPS**: 自動啟用
2. **環境變數**: 使用 Fly.io Secrets 安全存儲
3. **CORS**: 已配置允許的來源域名
4. **健康檢查**: 定期檢查應用程式狀態

## 📞 支援

- **Fly.io 文檔**: https://fly.io/docs/
- **社群論壇**: https://community.fly.io/
- **Discord**: https://fly.io/discord
