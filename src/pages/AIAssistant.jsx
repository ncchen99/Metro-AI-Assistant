import { useState, useEffect } from 'react'
import StatusBar from '../components/StatusBar'
import Header from '../components/Header'
import ActionCards from '../components/ActionCards'
import AIChat from '../components/AIChat'
import SearchBar from '../components/SearchBar'
import BottomNavigation from '../components/BottomNavigation'
import BackgroundBlurs from '../components/BackgroundBlurs'
import CallingPopup from '../components/CallingPopup'
import usePageTitle from '../hooks/usePageTitle'
import PageTransition from '../components/PageTransition'
import useAnimatedNavigate from '../hooks/useAnimatedNavigate'
import { askAI, speechToText, voiceToAI, AudioRecorder } from '../services/apiService'

function AIAssistant() {
    const animatedNavigate = useAnimatedNavigate()
    const [mode, setMode] = useState('work')
    const [showOverlay, setShowOverlay] = useState(false)
    const [overlayType, setOverlayType] = useState('')
    const [onOverlayClick, setOnOverlayClick] = useState(null)

    // 設置頁面標題
    usePageTitle("AI 助理 - 台北捷運智能助手")

    // 全螢幕狀態
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Popup state
    const [showCallingPopup, setShowCallingPopup] = useState(false)
    const [isAnimatingOut, setIsAnimatingOut] = useState(false)
    const [popupType, setPopupType] = useState('meeting')

    // Tooltip state  
    const [activeTooltip, setActiveTooltip] = useState(null)
    const [isTooltipAnimating, setIsTooltipAnimating] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, showLeft: false })

    // Chat state
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: '我是AI助理，有什麼我能幫您的嗎？',
            timestamp: new Date()
        }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [inputText, setInputText] = useState('')

    // Voice recording state
    const [isRecording, setIsRecording] = useState(false)
    const [audioRecorder, setAudioRecorder] = useState(null)
    const [isProcessingVoice, setIsProcessingVoice] = useState(false)

    // Voice streaming state
    const [voiceStatus, setVoiceStatus] = useState('')
    const [currentAIMessage, setCurrentAIMessage] = useState(null)

    // Tooltip content configuration
    const tooltipContent = {
        work: {
            ticket: '快速查看交通卡餘額與使用記錄',
            podcast: '播放工作相關或學習類節目',
            meeting: '開啟勿擾模式，靜音通知',
            phone: '快速撥打合作印刷廠聯絡人'
        },
        travel: {
            ticket: '查看景點門票與交通票券資訊',
            podcast: (
                <>
                    打開軟體 <span style={{ color: 'rgba(56,198,147,1)' }}>KKBOX</span>
                    <br />
                    <span style={{ fontWeight: 900, color: 'rgba(255,255,255,1)' }}>|</span>
                    <br />
                    播放 <span style={{ color: 'rgba(56,198,147,1)' }}>離線播放清單</span>
                </>
            ),
            meeting: '切換至旅遊專用勿擾設定',
            phone: '緊急情況下聯絡家人'
        }
    }

    // 全螢幕功能
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            });
        }
    };

    // 監聽全螢幕狀態變化
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // 初始化錄音器
    useEffect(() => {
        if (AudioRecorder.isSupported()) {
            setAudioRecorder(new AudioRecorder());
        }
    }, []);

    // 處理文字訊息發送 (使用串流)
    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        // 添加用戶訊息
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: text.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        // 使用串流 AI API
        let aiMessage = null;

        const callbacks = {
            onStatus: (message) => {
                // 可以在這裡顯示狀態，例如 "AI正在思考..."
                console.log('AI Status:', message);
            },

            onAIChunk: (chunk) => {
                // 移除參考來源標記
                const cleanedChunk = chunk.replace(/【.*?】/g, '');

                if (!aiMessage) {
                    // 創建新的AI訊息
                    aiMessage = {
                        id: Date.now() + 1,
                        type: 'ai',
                        content: cleanedChunk,
                        timestamp: new Date()
                    };
                    setCurrentAIMessage(aiMessage);
                    setMessages(prev => [...prev, aiMessage]);
                } else {
                    // 更新現有的AI訊息
                    aiMessage.content += cleanedChunk;
                    setCurrentAIMessage({ ...aiMessage });
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === aiMessage.id
                                ? { ...msg, content: aiMessage.content }
                                : msg
                        )
                    );
                }
            },

            onComplete: (data) => {
                setIsLoading(false);
                setCurrentAIMessage(null);
                console.log('AI completed:', data);
            },

            onError: (error, details) => {
                console.error('AI stream error:', error, details);
                setIsLoading(false);
                setCurrentAIMessage(null);

                // 添加錯誤訊息
                const errorMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    content: '抱歉，我遇到了一些問題，請稍後再試。',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        };

        try {
            await askAI(text.trim(), mode, callbacks);
        } catch (error) {
            callbacks.onError(error.message);
        }
    };

    // 處理語音錄音
    const handleVoiceRecording = async () => {
        if (!audioRecorder) {
            alert('您的瀏覽器不支援錄音功能');
            return;
        }

        if (!isRecording) {
            // 開始錄音
            const result = await audioRecorder.startRecording();
            if (result.success) {
                setIsRecording(true);
                setVoiceStatus('正在錄音...');
            } else {
                alert('無法開始錄音：' + result.error);
            }
        } else {
            // 停止錄音並處理
            setIsRecording(false);
            setIsProcessingVoice(true);
            setVoiceStatus('處理中...');

            try {
                const result = await audioRecorder.stopRecording();
                if (result.success) {
                    // 使用新的語音轉AI API
                    await handleVoiceToAI(result.data);
                } else {
                    alert('錄音失敗：' + result.error);
                    setIsProcessingVoice(false);
                    setVoiceStatus('');
                }
            } catch (error) {
                console.error('Voice processing error:', error);
                alert('語音處理失敗，請重試');
                setIsProcessingVoice(false);
                setVoiceStatus('');
            }
        }
    };

    // 處理語音轉AI的SSE流
    const handleVoiceToAI = async (audioFile) => {
        let userMessage = null;
        let aiMessage = null;

        const callbacks = {
            onStatus: (message) => {
                setVoiceStatus(message);
            },

            onSTTResult: (text) => {
                // 添加用戶訊息
                userMessage = {
                    id: Date.now(),
                    type: 'user',
                    content: text.trim(),
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, userMessage]);
                setVoiceStatus('AI正在回應...');
                // 設置 loading 狀態，顯示 AI 思考動畫
                setIsLoading(true);
            },

            onAIChunk: (chunk) => {
                // 移除參考來源標記
                const cleanedChunk = chunk.replace(/【.*?】/g, '');

                if (!aiMessage) {
                    // 創建新的AI訊息
                    aiMessage = {
                        id: Date.now() + 1,
                        type: 'ai',
                        content: cleanedChunk,
                        timestamp: new Date()
                    };
                    setCurrentAIMessage(aiMessage);
                    setMessages(prev => [...prev, aiMessage]);
                    // 當第一個 AI 訊息塊到達時，隱藏 loading 動畫
                    setIsLoading(false);
                } else {
                    // 更新現有的AI訊息
                    aiMessage.content += cleanedChunk;
                    setCurrentAIMessage({ ...aiMessage });
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === aiMessage.id
                                ? { ...msg, content: aiMessage.content }
                                : msg
                        )
                    );
                }
            },

            onComplete: (data) => {
                setIsProcessingVoice(false);
                setVoiceStatus('');
                setCurrentAIMessage(null);
                console.log('Voice to AI completed:', data);
            },

            onError: (error, details) => {
                console.error('Voice to AI error:', error, details);
                setIsProcessingVoice(false);
                setVoiceStatus('');
                setCurrentAIMessage(null);

                // 添加錯誤訊息
                const errorMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    content: '抱歉，語音處理過程中遇到問題，請重試。',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorMessage]);
            }
        };

        try {
            await voiceToAI(audioFile, mode, callbacks);
        } catch (error) {
            callbacks.onError(error.message);
        }
    };

    // 計算 tooltip 位置（基於滑鼠座標）
    const calculateTooltipPosition = (event) => {
        const containerRect = document.querySelector('.absolute.top-\\[20px\\]').getBoundingClientRect()
        const mouseX = event.clientX - containerRect.left
        const mouseY = event.clientY - containerRect.top

        // iPhone 內容區域寬度為 395px，檢查是否靠近右邊界
        const showLeft = mouseX > 295 // 如果滑鼠 X 座標超過 295px，則顯示在左邊

        return {
            x: mouseX,
            y: mouseY,
            showLeft: showLeft
        }
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Background image */}
                <img
                    src="/images/background2.webp"
                    alt=""
                    className="object-cover fixed top-0 left-0 w-full h-full z-0"
                />

                {/* Main Content Container */}
                <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-8 max-lg:flex-col max-lg:justify-start max-lg:pt-4 max-lg:space-y-4 max-sm:px-4">
                    <div className="flex items-center justify-between w-full max-w-7xl gap-16 max-lg:flex-col max-lg:gap-4 max-sm:gap-2">

                        {/* Left Side - Description Text */}
                        <div className="flex-1 max-w-lg max-lg:text-center">
                            <h1 className="text-5xl font-bold mb-8 leading-tight max-md:text-4xl max-sm:text-3xl max-sm:mt-32 max-md:mt-24 text-black">
                                北捷智能助手
                            </h1>

                            <div className="space-y-6 text-lg leading-relaxed max-md:text-base max-sm:space-y-4">
                                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4 rounded-3xl text-gray-800 max-sm:p-3 max-sm:text-sm">
                                    革命性的智能交通助手，為您的台北捷運之旅提供個性化體驗。
                                </div>

                                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-6 rounded-3xl max-sm:p-4">
                                    <h3 className="text-xl font-semibold mb-3 text-[#38C693] max-sm:text-lg max-sm:mb-2">主要功能</h3>
                                    <ul className="space-y-2 text-gray-800 max-sm:space-y-1 max-sm:text-sm">
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[#38C693] rounded-full mr-3 max-sm:mr-2"></span>
                                            智能路線規劃與即時資訊
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[#38C693] rounded-full mr-3 max-sm:mr-2"></span>
                                            工作與旅遊模式切換
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[#38C693] rounded-full mr-3 max-sm:mr-2"></span>
                                            AI 語音助手整合
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-2 h-2 bg-[#38C693] rounded-full mr-3 max-sm:mr-2"></span>
                                            個性化推薦服務
                                        </li>
                                    </ul>
                                </div>

                                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4 rounded-3xl text-gray-800 max-sm:p-3 max-sm:text-sm">
                                    體驗未來交通的智能化服務，讓每一次出行都變得更加便捷高效。
                                </div>
                            </div>
                        </div>

                        {/* Right Side - iPhone Mockup Container */}
                        <div className="relative z-10 flex-shrink-0 max-lg:scale-75 max-md:scale-70 mt-auto">
                            {/* iPhone Frame - Base layer */}
                            <svg width="435" height="892" viewBox="0 0 435 892" className="drop-shadow-2xl">
                                {/* iPhone Frame - Only the border */}
                                <defs>
                                    <mask id="phoneMask">
                                        <rect width="435" height="892" fill="white" />
                                        <rect x="20" y="20" width="395" height="852" rx="45" ry="45" fill="black" />
                                    </mask>
                                </defs>

                                {/* Outer frame */}
                                <rect x="0" y="0" width="435" height="892" rx="65" ry="65" fill="#1a1a1a" mask="url(#phoneMask)" />

                                {/* Inner frame */}
                                <rect x="10" y="10" width="415" height="872" rx="55" ry="55" fill="none" stroke="#333" strokeWidth="1" />
                            </svg>

                            {/* App Content - Positioned inside the frame */}
                            <div className="absolute top-[20px] left-[20px] w-[395px] h-[852px] overflow-hidden rounded-[45px]">
                                <div className="w-full h-full bg-white relative font-roboto overflow-hidden rounded-[45px]">
                                    <BackgroundBlurs mode={mode} />

                                    {/* iPhone Status Bar */}
                                    <div className="h-[24px] mt-[10px] bg-white flex items-center justify-between px-6 text-black text-[16px] font-medium">
                                        <div className="flex items-center space-x-1 font-medium pl-[10px]">
                                            <span>9:41</span>
                                        </div>
                                        <div className="flex items-center space-x-1 font-medium pr-[10px]">
                                            {/* WiFi Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M.676 6.941A12.964 12.964 0 0 1 10 3c3.657 0 6.963 1.511 9.324 3.941a.75.75 0 0 1-.008 1.053l-.353.354a.75.75 0 0 1-1.069-.008C15.894 6.28 13.097 5 10 5 6.903 5 4.106 6.28 2.106 8.34a.75.75 0 0 1-1.069.008l-.353-.354a.75.75 0 0 1-.008-1.053Zm2.825 2.833A8.976 8.976 0 0 1 10 7a8.976 8.976 0 0 1 6.499 2.774.75.75 0 0 1-.011 1.049l-.354.354a.75.75 0 0 1-1.072-.012A6.978 6.978 0 0 0 10 9c-1.99 0-3.786.83-5.061 2.165a.75.75 0 0 1-1.073.012l-.354-.354a.75.75 0 0 1-.01-1.05Zm2.82 2.84A4.989 4.989 0 0 1 10 11c1.456 0 2.767.623 3.68 1.614a.75.75 0 0 1-.022 1.039l-.354.354a.75.75 0 0 1-1.085-.026A2.99 2.99 0 0 0 10 13c-.88 0-1.67.377-2.22.981a.75.75 0 0 1-1.084.026l-.354-.354a.75.75 0 0 1-.021-1.039Zm2.795 2.752a1.248 1.248 0 0 1 1.768 0 .75.75 0 0 1 0 1.06l-.354.354a.75.75 0 0 1-1.06 0l-.354-.353a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                            </svg>
                                            {/* Battery Icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path d="M4.75 8a.75.75 0 0 0-.75.75v2.5c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-.75-.75h-9.5Z" />
                                                <path fillRule="evenodd" d="M1 7.25A2.25 2.25 0 0 1 3.25 5h12.5A2.25 2.25 0 0 1 18 7.25v1.085a1.5 1.5 0 0 1 1 1.415v.5a1.5 1.5 0 0 1-1 1.415v1.085A2.25 2.25 0 0 1 15.75 15H3.25A2.25 2.25 0 0 1 1 12.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75H3.25Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>

                                    <Header mode={mode} onModeChange={setMode} />
                                    <div className="w-full h-[5px] bg-metro-gradient"></div>
                                    <ActionCards
                                        mode={mode}
                                        onOverlayChange={setShowOverlay}
                                        onOverlayTypeChange={setOverlayType}
                                        onOverlayClickChange={setOnOverlayClick}
                                        onShowCallingPopup={setShowCallingPopup}
                                        onPopupAnimatingOut={setIsAnimatingOut}
                                        onPopupTypeChange={setPopupType}
                                        onActiveTooltip={(cardType, event) => {
                                            setActiveTooltip(cardType)
                                            if (cardType && event) {
                                                setTooltipPosition(calculateTooltipPosition(event))
                                            }
                                        }}
                                        onTooltipAnimating={setIsTooltipAnimating}
                                    />
                                    <SearchBar
                                        mode={mode}
                                        inputText={inputText}
                                        onInputChange={setInputText}
                                        onSendMessage={handleSendMessage}
                                        onVoiceRecording={handleVoiceRecording}
                                        isRecording={isRecording}
                                        isProcessingVoice={isProcessingVoice}
                                        isLoading={isLoading}
                                        voiceStatus={voiceStatus}
                                    />
                                    <AIChat
                                        mode={mode}
                                        messages={messages}
                                        isLoading={isLoading}
                                        currentAIMessage={currentAIMessage}
                                    />
                                    <BottomNavigation />

                                    {/* iPhone Home Indicator */}
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-70 z-[9999]"></div>

                                    {/* Global Overlay */}
                                    {showOverlay && (
                                        <div
                                            className={`absolute inset-0 z-[9995] transition-opacity duration-200 rounded-[45px] ${overlayType === 'popup' ? 'bg-black/20' : 'bg-black/30'
                                                }`}
                                            onClick={() => {
                                                if (onOverlayClick) {
                                                    onOverlayClick()
                                                } else {
                                                    setShowOverlay(false)
                                                }
                                            }}
                                        />
                                    )}

                                    {/* Calling Popup */}
                                    {showCallingPopup && (
                                        <div
                                            className={`absolute top-5 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-200 ease-out ${isAnimatingOut
                                                ? '-translate-y-full opacity-0'
                                                : 'translate-y-0 opacity-100'
                                                }`}
                                            style={{
                                                animation: isAnimatingOut
                                                    ? 'slideOut 200ms ease-out forwards'
                                                    : 'slideIn 200ms ease-out forwards'
                                            }}
                                        >
                                            <CallingPopup mode={mode} type={popupType} />
                                        </div>
                                    )}

                                    {/* Tooltips */}
                                    {activeTooltip && (
                                        <div
                                            className={`absolute z-[9996] transition-all duration-200 ease-out ${isTooltipAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                                                }`}
                                            style={{
                                                top: `${tooltipPosition.y - 10}px`,
                                                left: tooltipPosition.showLeft
                                                    ? `${tooltipPosition.x - (activeTooltip === 'meeting' ? 140 : 123) - 10}px`
                                                    : `${tooltipPosition.x + 10}px`,
                                                transformOrigin: tooltipPosition.showLeft ? 'top right' : 'top left'
                                            }}
                                        >
                                            <div className={`flex overflow-hidden flex-col justify-center py-2 text-xs font-semibold tracking-wide leading-3 text-center text-white rounded-md bg-neutral-700 bg-opacity-70 shadow-[0px_1px_2px_rgba(0,0,0,0.1)] ${activeTooltip === 'meeting' ? 'px-2 max-w-[140px]' : 'px-7 max-w-[123px]'
                                                }`}>
                                                <div className="text-white">
                                                    {tooltipContent[mode][activeTooltip]}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Glass circles positioned outside iframe container but relative to phone frame */}
                            <div className="absolute top-[-50px] right-[-50px] w-28 h-28 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-full z-[9999]"></div>
                            <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-full z-[9999]"></div>
                        </div>
                    </div>
                </div>

                {/* Back button - positioned at top left of entire screen */}
                <button onClick={(e) => animatedNavigate('/', e)} className="fixed top-8 left-8 z-30 px-6 py-3 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-3xl animate-fade-in hover:scale-105 transition-all duration-300">
                    <div className="flex justify-center items-center h-full">
                        <div className="text-xl font-bold text-black tracking-[8px] max-md:text-base max-md:tracking-[4px] max-sm:text-sm max-sm:tracking-[2px]">
                            BACK
                        </div>
                    </div>
                </button>

                {/* Fullscreen button - positioned at top right of entire screen */}
                <button
                    onClick={toggleFullscreen}
                    className="fixed top-8 right-8 z-30 p-4 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-3xl animate-fade-in hover:scale-105 transition-all duration-300"
                    title={isFullscreen ? "退出全螢幕" : "進入全螢幕"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-black">
                        <path d="m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z" />
                    </svg>
                </button>
            </div>
        </PageTransition>
    )
}

export default AIAssistant
