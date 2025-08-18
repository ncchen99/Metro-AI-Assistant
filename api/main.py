"""
Metro AI Assistant - FastAPI 後端服務
台北捷運智能助手的 Python 後端 API
"""

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional
import asyncio
import json
import tempfile
import os
import uuid
import traceback
from datetime import datetime
import openai
from openai import OpenAI
import uvicorn
from dotenv import load_dotenv

# 載入 .env 檔案
load_dotenv()

# 初始化 FastAPI 應用
app = FastAPI(
    title="Metro AI Assistant API",
    description="台北捷運智能助手後端 API",
    version="1.0.0"
)

# CORS 設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # 本地開發
        "http://localhost:3000",  # 本地開發替代端口
        "https://*.vercel.app",   # Vercel 部署域名
        "https://metro-sense-*.vercel.app",  # 你的 Vercel 專案
        "https://metro-sense.vercel.app",  # 你的特定 Vercel 域名
        "https://metro-sense.onrender.com",  # Render 後端域名 (如果需要自己呼叫自己)
        "https://metro-sense.fly.dev",  # Fly.io 部署域名
        "https://*.fly.dev",  # Fly.io 域名通配符
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI 客戶端初始化
client = None

def get_openai_client():
    global client
    if client is None:
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            error_msg = """
OPENAI_API_KEY 環境變數未設定！

請設定環境變數：
1. 創建 .env 檔案：將 env_example.txt 複製為 .env
2. 在 .env 檔案中設定：OPENAI_API_KEY=your_actual_api_key
3. 重新啟動伺服器

或直接設定環境變數：
export OPENAI_API_KEY="your_actual_api_key"
"""
            raise HTTPException(status_code=500, detail=error_msg.strip())
        client = OpenAI(api_key=api_key)
    return client

# Pydantic 模型定義
class HealthResponse(BaseModel):
    status: str
    timestamp: str
    service: str

class AskRequest(BaseModel):
    question: str
    mode: str = "work"

class AskResponse(BaseModel):
    success: bool
    answer: str
    mode: str
    timestamp: str
    question: str

class TTSRequest(BaseModel):
    text: str
    voice: str = "alloy"
    format: str = "mp3"
    speed: float = 1.0

class ErrorResponse(BaseModel):
    success: bool
    error: str
    timestamp: str

def get_current_timestamp():
    """獲取當前時間戳"""
    return datetime.now().isoformat() + "Z"

@app.get("/", response_model=HealthResponse)
async def root():
    """根路徑重定向到健康檢查"""
    return {
        "status": "ok",
        "timestamp": get_current_timestamp(),
        "service": "Metro AI Assistant API"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """健康檢查 API"""
    return {
        "status": "ok",
        "timestamp": get_current_timestamp(),
        "service": "Metro AI Assistant API"
    }

@app.post("/stt")
async def speech_to_text(audio: UploadFile = File(...)):
    """語音轉文字 API"""
    try:
        # 檢查檔案類型
        if not audio.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="請上傳音訊檔案")
        
        # 檢查檔案大小 (25MB 限制)
        content = await audio.read()
        if len(content) > 25 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="檔案大小不能超過 25MB")
        
        # 創建臨時檔案
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{audio.filename.split('.')[-1]}") as temp_file:
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        try:
            # 使用 OpenAI Whisper API 進行語音轉文字
            openai_client = get_openai_client()
            
            with open(temp_file_path, "rb") as audio_file:
                transcript = openai_client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    language="zh"  # 指定中文
                )
            
            return {
                "success": True,
                "text": transcript.text,
                "timestamp": get_current_timestamp()
            }
            
        finally:
            # 清理臨時檔案
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
                
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"語音轉文字失敗: {str(e)}")

@app.post("/ask")
async def ask_ai_sse(request: AskRequest):
    """AI 問答 SSE API - 使用 Server-Sent Events 提供即時回應"""
    try:
        if not request.question.strip():
            raise HTTPException(status_code=400, detail="問題不能為空")
        
        if len(request.question) > 4096:
            raise HTTPException(status_code=400, detail="問題長度不能超過 4096 字元")
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"請求處理失敗: {str(e)}")
    
    async def generate_sse_response(question: str, mode: str):
        try:
            # 發送連接確認
            yield f"data: {json.dumps({'type': 'connected', 'message': '連接已建立', 'timestamp': get_current_timestamp()})}\n\n"
            await asyncio.sleep(0.1)
            
            # 發送處理狀態
            yield f"data: {json.dumps({'type': 'status', 'message': '正在生成AI回應...', 'timestamp': get_current_timestamp()})}\n\n"
            await asyncio.sleep(0.1)
            
            # AI 問答處理
            try:
                openai_client = get_openai_client()
                
                # 從 Vector Store 查詢相關資訊
                yield f"data: {json.dumps({'type': 'status', 'message': '正在查詢捷運資料庫...', 'timestamp': get_current_timestamp()})}\n\n"
                await asyncio.sleep(0.1)
                
                # 使用 Vector Store ID 查詢相關資訊
                vector_store_id = "vs_68974a0ad7f08191b6de1a5e41a8e01b"
                
                # 建立 assistant 以使用 Vector Store
                assistant = openai_client.beta.assistants.create(
                    name="台北捷運助手",
                    instructions=f"""你是台北捷運智能助手，專門協助用戶解答關於台北捷運的問題。

當前模式：{mode}
- work 模式：專注於通勤、工作相關的捷運資訊
- travel 模式：專注於旅遊、觀光相關的捷運資訊

請根據提供的台北捷運資料回答問題，如果資料庫中沒有相關資訊，請說明並提供一般性建議。
請以繁體中文回答，提供準確、實用的捷運資訊。""",
                    model="gpt-4o-mini",
                    tools=[{"type": "file_search"}],
                    tool_resources={"file_search": {"vector_store_ids": [vector_store_id]}}
                )
                
                # 建立 thread
                thread = openai_client.beta.threads.create()
                
                # 建立 message
                openai_client.beta.threads.messages.create(
                    thread_id=thread.id,
                    role="user",
                    content=question
                )
                
                # 執行 run 並取得串流回應
                yield f"data: {json.dumps({'type': 'status', 'message': '正在生成AI回應...', 'timestamp': get_current_timestamp()})}\n\n"
                await asyncio.sleep(0.1)
                
                run = openai_client.beta.threads.runs.create(
                    thread_id=thread.id,
                    assistant_id=assistant.id,
                    stream=True
                )
                
                full_response = ""
                
                # 處理串流回應
                for event in run:
                    if event.event == 'thread.message.delta':
                        if hasattr(event.data.delta, 'content') and event.data.delta.content:
                            for content in event.data.delta.content:
                                if hasattr(content, 'text') and hasattr(content.text, 'value'):
                                    chunk_text = content.text.value
                                    full_response += chunk_text
                                    
                                    # 發送回應片段
                                    yield f"data: {json.dumps({'type': 'ai_response_chunk', 'chunk': chunk_text, 'timestamp': get_current_timestamp()})}\n\n"
                                    await asyncio.sleep(0.01)
                
                # 清理 assistant 和 thread
                try:
                    openai_client.beta.assistants.delete(assistant.id)
                    openai_client.beta.threads.delete(thread.id)
                except:
                    pass  # 忽略清理錯誤
                
                # 發送完整回應
                yield f"data: {json.dumps({'type': 'ai_response_complete', 'fullResponse': full_response, 'question': question, 'mode': mode, 'timestamp': get_current_timestamp()})}\n\n"
                
            except Exception as e:
                error_msg = f"AI 問答失敗: {str(e)}"
                yield f"data: {json.dumps({'type': 'error', 'error': error_msg, 'timestamp': get_current_timestamp()})}\n\n"
                return
                
        except Exception as e:
            error_msg = f"處理失敗: {str(e)}"
            yield f"data: {json.dumps({'type': 'error', 'error': error_msg, 'timestamp': get_current_timestamp()})}\n\n"
    
    return StreamingResponse(
        generate_sse_response(request.question, request.mode),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # 禁用 Nginx 緩衝
        }
    )

@app.post("/tts")
async def text_to_speech(request: TTSRequest):
    """文字轉語音 API"""
    try:
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="文字不能為空")
        
        if len(request.text) > 4096:
            raise HTTPException(status_code=400, detail="文字長度不能超過 4096 字元")
        
        # 驗證語音選項
        valid_voices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"]
        if request.voice not in valid_voices:
            raise HTTPException(status_code=400, detail=f"無效的語音選項，支援的選項: {', '.join(valid_voices)}")
        
        # 驗證格式
        valid_formats = ["mp3", "opus", "aac", "flac"]
        if request.format not in valid_formats:
            raise HTTPException(status_code=400, detail=f"無效的格式，支援的格式: {', '.join(valid_formats)}")
        
        # 驗證語速
        if not 0.25 <= request.speed <= 4.0:
            raise HTTPException(status_code=400, detail="語速必須在 0.25 到 4.0 之間")
        
        openai_client = get_openai_client()
        
        # 使用 OpenAI TTS API
        response = openai_client.audio.speech.create(
            model="tts-1",
            voice=request.voice,
            input=request.text,
            response_format=request.format,
            speed=request.speed
        )
        
        # 返回音訊流
        def iter_content():
            for chunk in response.iter_bytes(chunk_size=1024):
                yield chunk
        
        media_type = f"audio/{request.format}"
        
        return StreamingResponse(
            iter_content(),
            media_type=media_type,
            headers={
                "Content-Disposition": f"attachment; filename=speech.{request.format}"
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"文字轉語音失敗: {str(e)}")

@app.post("/voice-ask")
async def voice_to_ai_sse(
    audio: UploadFile = File(...),
    mode: str = Form("work")
):
    """語音轉AI問答 SSE API - 使用 Server-Sent Events 提供即時回應"""
    
    # 在進入 generator 之前先讀取檔案內容，避免檔案關閉問題
    try:
        print(f"[DEBUG] 開始處理語音檔案: {audio.filename}, 類型: {audio.content_type}")
        
        # 檢查檔案類型
        if not audio.content_type or not audio.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="請上傳音訊檔案")
        
        # 讀取音訊檔案內容 (在 generator 外部讀取)
        print(f"[DEBUG] 開始讀取音訊檔案內容...")
        content = await audio.read()
        print(f"[DEBUG] 音訊檔案內容讀取完成，大小: {len(content)} bytes")
        
        if len(content) > 25 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="檔案大小不能超過 25MB")
        
        if len(content) == 0:
            raise HTTPException(status_code=400, detail="音訊檔案為空")
            
        # 確定檔案副檔名
        file_extension = "mp3"  # 預設副檔名
        if audio.filename and '.' in audio.filename:
            file_extension = audio.filename.split('.')[-1]
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"檔案處理失敗: {str(e)}")
    
    async def generate_sse_response(audio_content: bytes, extension: str):
        question_text = ""
        
        try:
            # 發送連接確認
            yield f"data: {json.dumps({'type': 'connected', 'message': '連接已建立', 'timestamp': get_current_timestamp()})}\n\n"
            await asyncio.sleep(0.1)  # 小延遲確保訊息發送
            
            # 發送處理狀態
            yield f"data: {json.dumps({'type': 'status', 'message': '開始處理語音...', 'timestamp': get_current_timestamp()})}\n\n"
            await asyncio.sleep(0.1)
            
            # 1. 語音轉文字處理
            try:
                yield f"data: {json.dumps({'type': 'status', 'message': '正在轉換語音...', 'timestamp': get_current_timestamp()})}\n\n"
                await asyncio.sleep(0.1)
                
                # 創建臨時檔案 - 使用與 /stt 相同的方法
                print(f"[DEBUG] 創建臨時檔案，副檔名: {extension}")
                with tempfile.NamedTemporaryFile(delete=False, suffix=f".{extension}") as temp_file:
                    temp_file.write(audio_content)
                    temp_file_path = temp_file.name
                print(f"[DEBUG] 臨時檔案已創建: {temp_file_path}")
                
                try:
                    # 使用 OpenAI Whisper API 進行語音轉文字
                    print(f"[DEBUG] 取得 OpenAI 客戶端...")
                    openai_client = get_openai_client()
                    print(f"[DEBUG] OpenAI 客戶端取得成功")
                    
                    # 打開檔案進行轉錄
                    print(f"[DEBUG] 開始進行語音轉文字，檔案路徑: {temp_file_path}")
                    print(f"[DEBUG] 檔案是否存在: {os.path.exists(temp_file_path)}")
                    print(f"[DEBUG] 檔案大小: {os.path.getsize(temp_file_path) if os.path.exists(temp_file_path) else 'N/A'}")
                    
                    with open(temp_file_path, "rb") as audio_file:
                        print(f"[DEBUG] 檔案已打開，開始呼叫 OpenAI API...")
                        transcript = openai_client.audio.transcriptions.create(
                            model="whisper-1",
                            file=audio_file,
                            language="zh"
                        )
                        print(f"[DEBUG] OpenAI API 呼叫成功")
                    
                    question_text = transcript.text.strip()
                    print(f"[DEBUG] 語音轉文字結果: '{question_text}'")
                    
                    if not question_text:
                        error_msg = "無法識別語音內容，請重新錄音"
                        print(f"[DEBUG] 語音轉文字結果為空")
                        yield f"data: {json.dumps({'type': 'error', 'error': error_msg, 'timestamp': get_current_timestamp()})}\n\n"
                        return
                    
                    # 發送 STT 結果
                    print(f"[DEBUG] 發送 STT 結果到前端")
                    yield f"data: {json.dumps({'type': 'stt_result', 'text': question_text, 'timestamp': get_current_timestamp()})}\n\n"
                    await asyncio.sleep(0.1)
                    
                except Exception as processing_error:
                    print(f"[DEBUG] 語音轉文字處理錯誤: {type(processing_error).__name__}: {str(processing_error)}")
                    raise processing_error
                finally:
                    # 清理臨時檔案
                    try:
                        if os.path.exists(temp_file_path):
                            print(f"[DEBUG] 清理臨時檔案: {temp_file_path}")
                            os.unlink(temp_file_path)
                        else:
                            print(f"[DEBUG] 臨時檔案不存在，無需清理: {temp_file_path}")
                    except Exception as cleanup_error:
                        print(f"[DEBUG] 清理臨時檔案失敗: {cleanup_error}")
                        
            except Exception as e:
                error_msg = f"語音轉文字失敗: {str(e)}"
                print(f"[DEBUG] 語音轉文字整體錯誤: {type(e).__name__}: {str(e)}")
                print(f"[DEBUG] 錯誤堆疊: {traceback.format_exc()}")
                yield f"data: {json.dumps({'type': 'error', 'error': error_msg, 'timestamp': get_current_timestamp()})}\n\n"
                return
            
            # 2. AI 問答處理
            try:
                # 從 Vector Store 查詢相關資訊
                yield f"data: {json.dumps({'type': 'status', 'message': '正在查詢捷運資料庫...', 'timestamp': get_current_timestamp()})}\n\n"
                await asyncio.sleep(0.1)
                
                # 使用 Vector Store ID 查詢相關資訊
                vector_store_id = "vs_68974a0ad7f08191b6de1a5e41a8e01b"
                
                # 建立 assistant 以使用 Vector Store
                assistant = openai_client.beta.assistants.create(
                    name="台北捷運助手",
                    instructions=f"""你是台北捷運智能助手，專門協助用戶解答關於台北捷運的問題。

當前模式：{mode}
- work 模式：專注於通勤、工作相關的捷運資訊
- travel 模式：專注於旅遊、觀光相關的捷運資訊

請根據提供的台北捷運資料回答問題，如果資料庫中沒有相關資訊，請說明並提供一般性建議。
請以繁體中文回答，提供準確、實用的捷運資訊。""",
                    model="gpt-4o-mini",
                    tools=[{"type": "file_search"}],
                    tool_resources={"file_search": {"vector_store_ids": [vector_store_id]}}
                )
                
                # 建立 thread
                thread = openai_client.beta.threads.create()
                
                # 建立 message
                openai_client.beta.threads.messages.create(
                    thread_id=thread.id,
                    role="user",
                    content=question_text
                )
                
                # 執行 run 並取得串流回應
                yield f"data: {json.dumps({'type': 'status', 'message': '正在生成AI回應...', 'timestamp': get_current_timestamp()})}\n\n"
                await asyncio.sleep(0.1)
                
                run = openai_client.beta.threads.runs.create(
                    thread_id=thread.id,
                    assistant_id=assistant.id,
                    stream=True
                )
                
                full_response = ""
                
                # 處理串流回應
                for event in run:
                    if event.event == 'thread.message.delta':
                        if hasattr(event.data.delta, 'content') and event.data.delta.content:
                            for content in event.data.delta.content:
                                if hasattr(content, 'text') and hasattr(content.text, 'value'):
                                    chunk_text = content.text.value
                                    full_response += chunk_text
                                    
                                    # 發送回應片段
                                    yield f"data: {json.dumps({'type': 'ai_response_chunk', 'chunk': chunk_text, 'timestamp': get_current_timestamp()})}\n\n"
                                    await asyncio.sleep(0.01)
                
                # 清理 assistant 和 thread
                try:
                    openai_client.beta.assistants.delete(assistant.id)
                    openai_client.beta.threads.delete(thread.id)
                except:
                    pass  # 忽略清理錯誤
                
                # 發送完整回應
                yield f"data: {json.dumps({'type': 'ai_response_complete', 'fullResponse': full_response, 'question': question_text, 'mode': mode, 'timestamp': get_current_timestamp()})}\n\n"
                
            except Exception as e:
                error_msg = f"AI 問答失敗: {str(e)}"
                yield f"data: {json.dumps({'type': 'error', 'error': error_msg, 'timestamp': get_current_timestamp()})}\n\n"
                return
                
        except Exception as e:
            error_msg = f"處理失敗: {str(e)}"
            yield f"data: {json.dumps({'type': 'error', 'error': error_msg, 'timestamp': get_current_timestamp()})}\n\n"
    
    return StreamingResponse(
        generate_sse_response(content, file_extension),
        media_type="text/plain",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # 禁用 Nginx 緩衝
        }
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)