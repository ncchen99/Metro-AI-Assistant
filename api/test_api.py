#!/usr/bin/env python3
"""
測試 FastAPI 應用程式的簡單腳本
"""

import requests
import json
import sys
import os

# 設定 API 基本 URL
API_BASE_URL = "http://localhost:8000"

def test_health():
    """測試健康檢查端點"""
    print("🔍 測試健康檢查...")
    try:
        response = requests.get(f"{API_BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print("✅ 健康檢查成功:", data)
            return True
        else:
            print("❌ 健康檢查失敗:", response.status_code)
            return False
    except Exception as e:
        print("❌ 健康檢查錯誤:", str(e))
        return False

def test_ask():
    """測試 AI 問答端點"""
    print("\n🤖 測試 AI 問答...")
    try:
        payload = {
            "question": "台北車站到信義區怎麼搭捷運？",
            "mode": "work"
        }
        response = requests.post(
            f"{API_BASE_URL}/ask",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print("✅ AI 問答成功:")
            print(f"  問題: {data.get('question', 'N/A')}")
            print(f"  回答: {data.get('answer', 'N/A')[:100]}...")
            return True
        else:
            print("❌ AI 問答失敗:", response.status_code, response.text)
            return False
    except Exception as e:
        print("❌ AI 問答錯誤:", str(e))
        return False

def test_tts():
    """測試文字轉語音端點"""
    print("\n🔊 測試文字轉語音...")
    try:
        payload = {
            "text": "歡迎使用捷境 MetroSense",
            "voice": "alloy",
            "format": "mp3",
            "speed": 1.0
        }
        response = requests.post(
            f"{API_BASE_URL}/tts",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            # 檢查是否返回音頻數據
            if response.headers.get('content-type', '').startswith('audio/'):
                print("✅ 文字轉語音成功: 收到音頻檔案")
                print(f"  檔案大小: {len(response.content)} bytes")
                return True
            else:
                print("❌ 文字轉語音失敗: 返回格式不正確")
                return False
        else:
            print("❌ 文字轉語音失敗:", response.status_code, response.text)
            return False
    except Exception as e:
        print("❌ 文字轉語音錯誤:", str(e))
        return False

def main():
    """主測試函數"""
    print("🚀 開始測試 FastAPI Metro AI Assistant")
    print(f"API 基本 URL: {API_BASE_URL}")
    
    # 檢查環境變數
    if not os.getenv('OPENAI_API_KEY'):
        print("⚠️  警告: OPENAI_API_KEY 環境變數未設定")
        print("   某些功能可能無法正常運作")
    
    print("\n" + "="*50)
    
    results = []
    
    # 執行測試
    results.append(("健康檢查", test_health()))
    results.append(("AI 問答", test_ask()))
    results.append(("文字轉語音", test_tts()))
    
    # 顯示結果
    print("\n" + "="*50)
    print("📊 測試結果摘要:")
    
    passed = 0
    for test_name, result in results:
        status = "✅ 通過" if result else "❌ 失敗"
        print(f"  {test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\n總計: {passed}/{len(results)} 項測試通過")
    
    if passed == len(results):
        print("🎉 所有測試都通過了！")
        return 0
    else:
        print("⚠️  有部分測試失敗，請檢查設定和 API 狀態")
        return 1

if __name__ == "__main__":
    sys.exit(main())