const SearchBar = ({
  mode = 'work',
  inputText = '',
  onInputChange,
  onSendMessage,
  onVoiceRecording,
  isRecording = false,
  isProcessingVoice = false,
  isLoading = false
}) => {

  // 處理 Enter 鍵送出
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && inputText.trim()) {
      onSendMessage(inputText);
    }
  };

  // 處理麥克風點擊
  const handleMicClick = () => {
    if (!isLoading && !isProcessingVoice) {
      onVoiceRecording();
    }
  };

  // 取得麥克風圖示顏色和動畫
  const getMicrophoneStyles = () => {
    const baseColor = mode === 'work' ? '#4088F4' : '#38c693';

    if (isProcessingVoice) {
      return {
        color: baseColor,
        opacity: 0.7,
        animation: 'pulse 1s infinite'
      };
    }

    if (isRecording) {
      return {
        color: '#ff4444', // 錄音時變紅色
        animation: 'recordingPulse 0.8s infinite alternate, recordingGlow 1.5s infinite'
      };
    }

    return {
      color: baseColor
    };
  };

  return (
    <>
      {/* 加入 CSS 動畫定義 */}
      <style jsx>{`
        @keyframes recordingPulse {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes recordingGlow {
          0% { filter: brightness(1) drop-shadow(0 0 2px currentColor); }
          50% { filter: brightness(1.3) drop-shadow(0 0 6px currentColor); }
          100% { filter: brightness(1) drop-shadow(0 0 2px currentColor); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="relative z-10 px-11 pb-4">
        {/* Search Container */}
        <div className="w-[306px] h-[29px] bg-white/30 backdrop-blur-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.6),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] rounded-full mx-auto relative flex items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder={isRecording ? "正在錄音..." : isProcessingVoice ? "處理中..." : "詢問任何問題"}
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading || isRecording || isProcessingVoice}
            className="w-full h-full bg-transparent rounded-full px-4 py-2 text-sm font-bold text-gray-700 tracking-[0.8px] placeholder-text-muted border-0 outline-none disabled:opacity-70"
          />

          {/* Microphone Icon or Loading Spinner */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isProcessingVoice ? (
              // Loading spinner
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              // Microphone Icon
              <button
                onClick={handleMicClick}
                disabled={isLoading}
                className="p-1 rounded-full hover:bg-white/10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title={isRecording ? "點擊停止錄音" : "點擊開始錄音"}
              >
                <svg
                  className="w-4 h-4 transition-all duration-200"
                  style={getMicrophoneStyles()}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar
