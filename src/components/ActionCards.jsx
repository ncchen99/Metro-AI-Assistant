import { useState } from 'react'
import CallingPopup from './CallingPopup'

const ActionCards = ({ mode = 'work' }) => {
  const [showCallingPopup, setShowCallingPopup] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [activeTooltip, setActiveTooltip] = useState(null)
  const [isTooltipAnimating, setIsTooltipAnimating] = useState(false)
  const [isHoveringTooltipArea, setIsHoveringTooltipArea] = useState(false)
  const [popupType, setPopupType] = useState('meeting') // 'meeting' or 'phone'

  const handleMeetingModeClick = () => {
    setPopupType('meeting')
    setShowCallingPopup(true)
    setIsAnimatingOut(false)
    setTimeout(() => handleClosePopup(), 3000) // Auto-hide after 3 seconds
  }

  const handlePhoneClick = () => {
    setPopupType('phone')
    setShowCallingPopup(true)
    setIsAnimatingOut(false)
    setTimeout(() => handleClosePopup(), 3000) // Auto-hide after 3 seconds
  }

  const handleClosePopup = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setShowCallingPopup(false)
      setIsAnimatingOut(false)
    }, 200) // Wait for slide-out animation to complete
  }

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

  const handleTooltipAreaEnter = (cardType) => {
    setIsHoveringTooltipArea(true)
    setActiveTooltip(cardType)
    setIsTooltipAnimating(false)
  }

  const handleTooltipAreaLeave = () => {
    setIsHoveringTooltipArea(false)
    // Only start hide animation if we're not hovering
    setTimeout(() => {
      if (!isHoveringTooltipArea) {
        setIsTooltipAnimating(true)
        setTimeout(() => {
          setActiveTooltip(null)
          setIsTooltipAnimating(false)
        }, 200)
      }
    }, 50) // Small delay to check final hover state
  }

  const handleTooltipClick = (cardType) => {
    if (activeTooltip === cardType) {
      setIsHoveringTooltipArea(false)
      setIsTooltipAnimating(true)
      setTimeout(() => {
        setActiveTooltip(null)
        setIsTooltipAnimating(false)
      }, 200)
    } else {
      setIsHoveringTooltipArea(true)
      setActiveTooltip(cardType)
      setIsTooltipAnimating(false)
    }
  }

  return (
    <div className="relative z-10 px-[20px] pt-8 pb-4">
      {/* Card Grid */}
      <div className="grid grid-cols-3 gap-x-5 gap-y-5">
        {/* My Ticket Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-transparent shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative">
            <div className="p-[5px] relative h-full">
              {/* Ticket Icon - Heroicons */}
              <div className="absolute top-2 left-2">
                <svg className={`w-5 h-5 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`} fill="currentColor" viewBox="0 0 24 24" >
                  <path fillRule="evenodd" d="M15.75 3A2.25 2.25 0 0 1 18 5.25v1.214c0 .423-.277.788-.633 1.019A2.997 2.997 0 0 0 16 10c0 1.055.544 1.982 1.367 2.517.356.231.633.596.633 1.02v1.213A2.25 2.25 0 0 1 15.75 17H4.25A2.25 2.25 0 0 1 2 14.75v-1.213c0-.424.277-.789.633-1.02A2.998 2.998 0 0 0 4 10a2.997 2.997 0 0 0-1.367-2.517C2.277 7.252 2 6.887 2 6.463V5.25A2.25 2.25 0 0 1 4.25 3h11.5ZM13.5 7.396a.75.75 0 0 0-1.5 0v1.042a.75.75 0 0 0 1.5 0V7.396Zm0 4.167a.75.75 0 0 0-1.5 0v1.041a.75.75 0 0 0 1.5 0v-1.041Z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Info Icon - Heroicons Mini */}
              <div
                className="absolute top-2 right-2 w-3 h-3 cursor-pointer"
                onMouseEnter={() => handleTooltipAreaEnter('ticket')}
                onMouseLeave={handleTooltipAreaLeave}
                onClick={() => handleTooltipClick('ticket')}
              >
                <svg
                  className={`w-3 h-3 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className={`text-xs font-bold tracking-[0.1em] transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}>我的票卡</span>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {activeTooltip === 'ticket' && (
            <div
              className={`absolute -top-2 -right-2 z-50 transition-all duration-200 ease-out ${isTooltipAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              onMouseEnter={() => handleTooltipAreaEnter('ticket')}
              onMouseLeave={handleTooltipAreaLeave}
            >
              <div className="flex overflow-hidden flex-col justify-center px-7 py-2 text-xs font-semibold tracking-wide leading-3 text-center text-white rounded-md bg-neutral-700 bg-opacity-70 max-w-[123px] shadow-[0px_1px_2px_rgba(0,0,0,0.1)]">
                <div className="text-white">
                  {tooltipContent[mode].ticket}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Podcast Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-transparent shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative">
            <div className="p-[5px] relative h-full">
              {/* Musical Note Icon - Heroicons */}
              <svg className={`absolute top-2 left-2 w-5 h-5 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`} fill="currentColor" viewBox="0 0 24 24" >
                <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 0 1 .279.583v11.29a2.25 2.25 0 0 1-1.774 2.2l-2.041.44a2.216 2.216 0 0 1-.938-4.332l2.662-.577a.75.75 0 0 0 .591-.733V6.112l-8 1.73v7.684a2.25 2.25 0 0 1-1.774 2.2l-2.042.44a2.216 2.216 0 1 1-.935-4.331l2.659-.573A.75.75 0 0 0 7 12.529V4.236a.75.75 0 0 1 .591-.733l9.5-2.054a.75.75 0 0 1 .63.15Z" clipRule="evenodd" />
              </svg>

              {/* Info Icon - Heroicons Mini */}
              <div
                className="absolute top-2 right-2 w-3 h-3 cursor-pointer"
                onMouseEnter={() => handleTooltipAreaEnter('podcast')}
                onMouseLeave={handleTooltipAreaLeave}
                onClick={() => handleTooltipClick('podcast')}
              >
                <svg
                  className={`w-3 h-3 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className={`text-xs font-bold tracking-[0.1em] transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}>
                  {mode === 'work' ? 'Podcast' : '唱歌'}
                </span>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {activeTooltip === 'podcast' && (
            <div
              className={`absolute -top-2 -right-2 z-50 transition-all duration-200 ease-out ${isTooltipAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              onMouseEnter={() => handleTooltipAreaEnter('podcast')}
              onMouseLeave={handleTooltipAreaLeave}
            >
              <div className="flex overflow-hidden flex-col justify-center px-7 py-2 text-xs font-semibold tracking-wide leading-3 text-center text-white rounded-md bg-neutral-700 bg-opacity-70 max-w-[123px] shadow-[0px_1px_2px_rgba(0,0,0,0.1)]">
                <div className="text-white">
                  {tooltipContent[mode].podcast}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mute Card */}
        <div className="relative">
          <div
            className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-transparent shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative cursor-pointer hover:bg-white/40 transition-colors"
            onClick={handleMeetingModeClick}
          >
            <div className="p-[5px] relative h-full">
              {/* Speaker Icon - Heroicons */}
              <svg className={`absolute top-2 left-2 w-5 h-5 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
              </svg>

              {/* Info Icon - Heroicons Mini */}
              <div
                className="absolute top-2 right-2 w-3 h-3 cursor-pointer"
                onMouseEnter={() => handleTooltipAreaEnter('meeting')}
                onMouseLeave={handleTooltipAreaLeave}
                onClick={(e) => {
                  e.stopPropagation()
                  handleTooltipClick('meeting')
                }}
              >
                <svg
                  className={`w-3 h-3 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className={`text-xs font-bold tracking-[0.1em] transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}>會議模式</span>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {activeTooltip === 'meeting' && (
            <div
              className={`absolute -top-2 -right-2 z-50 transition-all duration-200 ease-out ${isTooltipAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              onMouseEnter={() => handleTooltipAreaEnter('meeting')}
              onMouseLeave={handleTooltipAreaLeave}
            >
              <div className="flex overflow-hidden flex-col justify-center px-2 py-2 text-xs font-semibold tracking-wide leading-3 text-center text-white rounded-md bg-neutral-700 bg-opacity-70 max-w-[140px] shadow-[0px_1px_2px_rgba(0,0,0,0.1)]">
                <div className="text-white">
                  {tooltipContent[mode].meeting}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Phone Card */}
        <div className="relative">
          <div
            className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-transparent shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative cursor-pointer hover:bg-white/40 transition-colors"
            onClick={handlePhoneClick}
          >
            <div className="p-[5px] relative h-full">
              {/* Phone Icon - Heroicons */}
              <svg className={`absolute top-2 left-2 w-5 h-5 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`} fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
              </svg>

              {/* Info Icon - Heroicons Mini */}
              <div
                className="absolute top-2 right-2 w-3 h-3 cursor-pointer"
                onMouseEnter={() => handleTooltipAreaEnter('phone')}
                onMouseLeave={handleTooltipAreaLeave}
                onClick={(e) => {
                  e.stopPropagation()
                  handleTooltipClick('phone')
                }}
              >
                <svg
                  className={`w-3 h-3 transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className={`text-xs font-bold tracking-[0.1em] transition-colors duration-300 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`}> {mode === 'work' ? '印刷廠商的電話' : '緊急聯絡人'}</span>
              </div>
            </div>
          </div>

          {/* Tooltip */}
          {activeTooltip === 'phone' && (
            <div
              className={`absolute -top-2 -right-2 z-50 transition-all duration-200 ease-out ${isTooltipAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              onMouseEnter={() => handleTooltipAreaEnter('phone')}
              onMouseLeave={handleTooltipAreaLeave}
            >
              <div className="flex overflow-hidden flex-col justify-center px-7 py-2 text-xs font-semibold tracking-wide leading-3 text-center text-white rounded-md bg-neutral-700 bg-opacity-70 max-w-[123px] shadow-[0px_1px_2px_rgba(0,0,0,0.1)]">
                <div className="text-white">
                  {tooltipContent[mode].phone}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Card 1 */}
        <div className="relative">
          <div className={`w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-dashed border-opacity-30 shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative flex items-center justify-center transition-colors duration-300 ${mode === 'work' ? 'border-[#1577FF]' : 'border-[#38c693]'
            }`}>
            <svg className={`w-6 h-6 transition-colors duration-300 ${mode === 'work' ? 'text-light-blue' : 'text-light-green'}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>
        </div>

        {/* Add Card 2 */}
        <div className="relative">
          <div className={`w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-dashed border-opacity-30 shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative flex items-center justify-center transition-colors duration-300 ${mode === 'work' ? 'border-[#1577FF]' : 'border-[#38c693]'
            }`}>
            <svg className={`w-6 h-6 transition-colors duration-300 ${mode === 'work' ? 'text-light-blue' : 'text-light-green'}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Backdrop overlay for calling popup */}
      {showCallingPopup && (
        <div
          className={`fixed inset-0 bg-black/20 z-[9998] transition-opacity duration-200 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'
            }`}
          onClick={handleClosePopup}
        />
      )}

      {/* Backdrop overlay for tooltip */}
      {activeTooltip && (
        <div
          className={`fixed inset-0 bg-black/30 z-[45] transition-opacity duration-200 ${isTooltipAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          onClick={handleTooltipAreaLeave}
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
    </div>
  )
}

export default ActionCards
