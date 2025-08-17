#!/usr/bin/env python3
"""
啟動 FastAPI 開發伺服器的便利腳本
"""

import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """檢查必要的依賴是否已安裝"""
    try:
        import fastapi
        import uvicorn
        import openai
        print("✅ 所有必要依賴已安裝")
        return True
    except ImportError as e:
        print(f"❌ 缺少依賴: {e}")
        print("請執行: pip install -r requirements.txt")
        return False

def check_env():
    """檢查環境變數"""
    # 嘗試載入 .env 檔案
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        print("⚠️  python-dotenv 未安裝，無法自動載入 .env 檔案")
    
    if not os.getenv('OPENAI_API_KEY'):
        print("⚠️  警告: OPENAI_API_KEY 環境變數未設定")
        print()
        
        # 檢查是否有 .env 檔案
        env_file = Path('.env')
        env_example = Path('env_example.txt')
        
        if not env_file.exists():
            print("📋 設定步驟：")
            if env_example.exists():
                print("1. 複製範例檔案：cp env_example.txt .env")
            else:
                print("1. 創建 .env 檔案")
            print("2. 編輯 .env 檔案，設定：OPENAI_API_KEY=your_actual_api_key")
            print("3. 重新執行此腳本")
        else:
            print("📋 .env 檔案已存在，請檢查是否正確設定 OPENAI_API_KEY")
        
        print()
        print("或者直接設定環境變數：")
        print("export OPENAI_API_KEY='your_actual_api_key'")
        
        return False
    
    print("✅ 環境變數設定正確")
    return True

def start_server():
    """啟動開發伺服器"""
    print("🚀 啟動 FastAPI 開發伺服器...")
    print("   URL: http://localhost:8000")
    print("   Swagger UI: http://localhost:8000/docs")
    print("   按 Ctrl+C 停止伺服器")
    print()
    
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8000"
        ])
    except KeyboardInterrupt:
        print("\n👋 伺服器已停止")

def main():
    print("🎯 Metro AI Assistant - FastAPI 開發伺服器")
    print("="*50)
    
    # 檢查依賴
    if not check_requirements():
        return 1
    
    # 檢查環境變數
    env_ok = check_env()
    
    print("="*50)
    
    if not env_ok:
        choice = input("是否仍要啟動伺服器？(y/N): ").lower()
        if choice != 'y':
            print("取消啟動")
            return 1
    
    # 啟動伺服器
    start_server()
    return 0

if __name__ == "__main__":
    sys.exit(main())
