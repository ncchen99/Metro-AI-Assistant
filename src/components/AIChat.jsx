const AIChat = () => {
  return (
    <div className="relative z-10 px-8 py-4">
      {/* Main Chat Container */}
      <div className="w-[330px] h-[420px] rounded-2xl bg-transparent shadow-[0_5px_7px_1px_rgba(0,0,0,0.20)] relative">
        
        {/* AI Bot Avatar 1 */}
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/116efd66bbf25886fd360b881a1699a39c428201?width=48" 
          alt="AI Bot" 
          className="absolute w-6 h-[22px] left-[14px] top-[34px]"
        />

        {/* AI Bot Avatar 2 */}
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/116efd66bbf25886fd360b881a1699a39c428201?width=48" 
          alt="AI Bot" 
          className="absolute w-6 h-[22px] left-[14px] top-[107px]"
        />

        {/* First AI Message */}
        <div className="absolute left-[47px] top-[37px] w-[182px] h-4 bg-chat-bg rounded-full flex items-center px-[10px] py-[5px] shadow-[0_1px_2px_0_rgba(0,0,0,0.10)]">
          <span className="text-xs font-bold text-[#007AB0] tracking-[1.2px]">
            我是AI助理xxx，有什麼我能幫您的嗎？
          </span>
        </div>

        {/* Large AI Message */}
        <div className="absolute left-[48px] top-[107px] w-[182px] h-[117px] bg-chat-bg rounded-[10px] flex items-center px-[10px] py-[36px] shadow-[0_1px_2px_0_rgba(0,0,0,0.10)]">
          <span className="text-xs font-bold text-[#007AB0] tracking-[1.2px] leading-[140%]">
            我不知道，這裡應該就是念誠麒安訓練的 內容，所以我只是隨便亂打
          </span>
        </div>

        {/* Action Icons */}
        <div className="absolute left-[239px] top-[162px] flex items-center gap-[6px]">
          {/* Share Icon */}
          <svg className="w-[6px] h-[6px]" fill="#4088F4" viewBox="0 0 31 8">
            <path fillRule="evenodd" clipRule="evenodd" d="M29.4615 1.85714C29.4615 1.38376 29.8059 1 30.2308 1C30.6556 1 31 1.38376 31 1.85714C31 2.33053 30.6556 2.71429 30.2308 2.71429C30.0111 2.71429 29.8131 2.61164 29.6731 2.4475L27.5138 3.78419C27.5299 3.85324 27.5385 3.92559 27.5385 4C27.5385 4.07441 27.5299 4.14676 27.5138 4.21581L29.6731 5.5525C29.8131 5.38836 30.0111 5.28571 30.2308 5.28571C30.6556 5.28571 31 5.66947 31 6.14286C31 6.61624 30.6556 7 30.2308 7C29.8059 7 29.4615 6.61624 29.4615 6.14286C29.4615 6.06844 29.4701 5.9961 29.4862 5.92705L27.3269 4.59035C27.1869 4.7545 26.9889 4.85714 26.7692 4.85714C26.3444 4.85714 26 4.47339 26 4C26 3.52661 26.3444 3.14286 26.7692 3.14286C26.9889 3.14286 27.1869 3.2455 27.3269 3.40965L29.4862 2.07295C29.4701 2.0039 29.4615 1.93156 29.4615 1.85714Z"/>
            <path d="M1.375 1C1.16789 1 1 1.16789 1 1.375V6.62499C1 6.77666 1.09137 6.9134 1.23149 6.97144C1.37162 7.02949 1.53292 6.9974 1.64017 6.89015L3.5 5.03032L5.35983 6.89015C5.46708 6.9974 5.62838 7.02949 5.76851 6.97144C5.90863 6.9134 6 6.77666 6 6.62499V1.375C6 1.16789 5.83211 1 5.625 1H1.375Z" stroke="#4088F4" strokeWidth="0.8" strokeLinejoin="round"/>
          </svg>
          
          {/* Download Icon */}
          <svg className="w-2 h-2" stroke="#4088F4" fill="none" viewBox="0 0 8 8">
            <rect width="8" height="8"/>
            <path d="M4.3 6.69971H1.3V6.02393C1.4466 6.1916 1.6595 6.30018 1.8997 6.30029H3.7004C3.9406 6.30018 4.1535 6.1916 4.3 6.02393V6.69971Z"/>
          </svg>
        </div>

        {/* User Message */}
        <div className="absolute left-[176px] top-[72px] w-[135px] h-4 bg-white rounded-full flex items-center justify-end px-[8px] py-[5px] shadow-[0_1px_2px_0_rgba(0,0,0,0.10)]">
          <span className="text-xs font-bold text-text-gray tracking-[1.2px]">
            美麗印刷廠附近咖啡廳
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-[1px] top-[349px] w-[6px] h-[371px] flex justify-center items-end bg-transparent rounded-[25px] shadow-[1px_0_5px_rgba(3,122,176,0.40)]">
          <div className="w-[6px] h-[54px] bg-white rounded-[25px] shadow-[1px_0_5px_rgba(3,122,176,0.40)]"></div>
        </div>
      </div>
    </div>
  )
}

export default AIChat
