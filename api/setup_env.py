#!/usr/bin/env python3
"""
幫助設定 .env 檔案的腳本
"""

import os
from pathlib import Path

def setup_env():
    """設定 .env 檔案"""
    print("🔧 Metro AI Assistant - 環境設定")
    print("="*50)
    
    env_file = Path('.env')
    env_example = Path('env_example.txt')
    
    # 檢查是否已有 .env 檔案
    if env_file.exists():
        print("📄 .env 檔案已存在")
        
        # 檢查是否已設定 API 金鑰
        try:
            with open('.env', 'r', encoding='utf-8') as f:
                content = f.read()
                if 'OPENAI_API_KEY=' in content and 'your_openai_api_key_here' not in content:
                    print("✅ OPENAI_API_KEY 似乎已設定")
                    return True
                else:
                    print("⚠️  OPENAI_API_KEY 尚未正確設定")
        except Exception as e:
            print(f"❌ 讀取 .env 檔案時發生錯誤: {e}")
    else:
        print("📄 .env 檔案不存在，將創建新檔案")
    
    print()
    print("請輸入您的 OpenAI API 金鑰：")
    print("(可在 https://platform.openai.com/api-keys 獲取)")
    
    api_key = input("API Key: ").strip()
    
    if not api_key:
        print("❌ 未輸入 API 金鑰，取消設定")
        return False
    
    if api_key.startswith('sk-') and len(api_key) > 20:
        # 創建 .env 檔案內容
        env_content = f"""# OpenAI API 金鑰
OPENAI_API_KEY={api_key}

# 開發環境設定
ENVIRONMENT=development

# API 設定
DEBUG=true
"""
        
        try:
            with open('.env', 'w', encoding='utf-8') as f:
                f.write(env_content)
            
            print("✅ .env 檔案創建成功！")
            print()
            print("現在可以啟動伺服器：")
            print("python start.py")
            return True
            
        except Exception as e:
            print(f"❌ 創建 .env 檔案時發生錯誤: {e}")
            return False
    else:
        print("❌ API 金鑰格式不正確，應該以 'sk-' 開頭")
        return False

if __name__ == "__main__":
    setup_env()
