#!/bin/bash

# Metro AI Assistant - Fly.io 部署腳本
# 這個腳本會自動部署您的 FastAPI 後端到 Fly.io

set -e  # 遇到錯誤時停止執行

echo "🚀 Metro AI Assistant - Fly.io 部署開始"

# 檢查 Fly CLI 是否已安裝
if ! command -v fly &> /dev/null; then
    echo "❌ Fly CLI 未安裝！"
    echo "請先安裝 Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/"
    echo "或執行: curl -L https://fly.io/install.sh | sh"
    exit 1
fi

# 檢查是否已登入 Fly.io
if ! fly auth whoami &> /dev/null; then
    echo "❌ 請先登入 Fly.io"
    echo "執行: fly auth login"
    exit 1
fi

# 檢查環境變數
if [ -z "$OPENAI_API_KEY" ]; then
    echo "⚠️  警告: OPENAI_API_KEY 環境變數未設定"
    echo "部署後請記得設定環境變數："
    echo "fly secrets set OPENAI_API_KEY=your_api_key"
fi

echo "✅ 環境檢查完成"

# 檢查是否已經有 Fly.io 應用程式
if fly apps list | grep -q "metro-ai-assistant-api"; then
    echo "📦 應用程式已存在，執行部署..."
    fly deploy
else
    echo "🆕 首次部署，創建新應用程式..."
    fly launch --no-deploy
    
    # 設定環境變數 (如果有的話)
    if [ ! -z "$OPENAI_API_KEY" ]; then
        echo "🔑 設定 OpenAI API Key..."
        fly secrets set OPENAI_API_KEY="$OPENAI_API_KEY"
    fi
    
    echo "🚀 開始部署..."
    fly deploy
fi

echo "✅ 部署完成！"
echo "🌐 您的 API 現在可以在以下網址訪問："
echo "   https://metro-ai-assistant-api.fly.dev"
echo ""
echo "🔧 有用的命令："
echo "   fly logs                    # 查看日誌"
echo "   fly status                  # 查看狀態"
echo "   fly secrets list            # 查看環境變數"
echo "   fly secrets set KEY=VALUE   # 設定環境變數"
echo "   fly scale count 1           # 設定實例數量"
echo "   fly ssh console             # SSH 連線到容器"
