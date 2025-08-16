import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Header from '../components/Header'
import ActionCards from '../components/ActionCards'
import AIChat from '../components/AIChat'
import SearchBar from '../components/SearchBar'
import BottomNavigation from '../components/BottomNavigation'
import BackgroundBlurs from '../components/BackgroundBlurs'
import CallingPopup from '../components/CallingPopup'

function AIAssistant() {
    const [mode, setMode] = useState('work')
    const [showOverlay, setShowOverlay] = useState(false)
    const [overlayType, setOverlayType] = useState('')
    const [onOverlayClick, setOnOverlayClick] = useState(null)

    // Popup state
    const [showCallingPopup, setShowCallingPopup] = useState(false)
    const [isAnimatingOut, setIsAnimatingOut] = useState(false)
    const [popupType, setPopupType] = useState('meeting')

    // Tooltip state  
    const [activeTooltip, setActiveTooltip] = useState(null)
    const [isTooltipAnimating, setIsTooltipAnimating] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, showLeft: false })

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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
            {/* iPhone Mockup Container */}
            <div className="relative">
                {/* iPhone Frame - Base layer */}
                <svg width="435" height="890" viewBox="0 0 435 890" className="drop-shadow-2xl">
                    {/* iPhone Frame - Only the border */}
                    <defs>
                        <mask id="phoneMask">
                            <rect width="435" height="890" fill="white" />
                            <rect x="20" y="20" width="395" height="850" rx="45" ry="45" fill="black" />
                        </mask>
                    </defs>

                    {/* Outer frame */}
                    <rect x="0" y="0" width="435" height="890" rx="65" ry="65" fill="#1a1a1a" mask="url(#phoneMask)" />

                    {/* Inner frame */}
                    <rect x="10" y="10" width="415" height="870" rx="55" ry="55" fill="none" stroke="#333" strokeWidth="1" />
                </svg>

                {/* App Content - Positioned inside the frame */}
                <div className="absolute top-[20px] left-[20px] w-[395px] h-[850px] overflow-hidden">
                    <div className="w-full h-full bg-white relative font-roboto overflow-hidden rounded-[45px]">
                        <BackgroundBlurs mode={mode} />
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
                        <SearchBar mode={mode} />
                        <AIChat mode={mode} />
                        <BottomNavigation />

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
                                className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-200 ease-out ${isAnimatingOut
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
            </div>
        </div>
    )
}

export default AIAssistant
