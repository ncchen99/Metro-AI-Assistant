const ActionCards = () => {
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
                <svg className="w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 24 24" >
                  <path fill-rule="evenodd" d="M15.75 3A2.25 2.25 0 0 1 18 5.25v1.214c0 .423-.277.788-.633 1.019A2.997 2.997 0 0 0 16 10c0 1.055.544 1.982 1.367 2.517.356.231.633.596.633 1.02v1.213A2.25 2.25 0 0 1 15.75 17H4.25A2.25 2.25 0 0 1 2 14.75v-1.213c0-.424.277-.789.633-1.02A2.998 2.998 0 0 0 4 10a2.997 2.997 0 0 0-1.367-2.517C2.277 7.252 2 6.887 2 6.463V5.25A2.25 2.25 0 0 1 4.25 3h11.5ZM13.5 7.396a.75.75 0 0 0-1.5 0v1.042a.75.75 0 0 0 1.5 0V7.396Zm0 4.167a.75.75 0 0 0-1.5 0v1.041a.75.75 0 0 0 1.5 0v-1.041Z" clip-rule="evenodd" />
                </svg>

              </div>

              {/* Info Icon - Heroicons Mini */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className="text-xs font-bold text-primary-blue tracking-[0.1em]">我的票卡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Podcast Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-transparent shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative">
            <div className="p-[5px] relative h-full">
              {/* Musical Note Icon - Heroicons */}
              <svg className="absolute top-2 left-2 w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 24 24" >
                <path fill-rule="evenodd" d="M17.721 1.599a.75.75 0 0 1 .279.583v11.29a2.25 2.25 0 0 1-1.774 2.2l-2.041.44a2.216 2.216 0 0 1-.938-4.332l2.662-.577a.75.75 0 0 0 .591-.733V6.112l-8 1.73v7.684a2.25 2.25 0 0 1-1.774 2.2l-2.042.44a2.216 2.216 0 1 1-.935-4.331l2.659-.573A.75.75 0 0 0 7 12.529V4.236a.75.75 0 0 1 .591-.733l9.5-2.054a.75.75 0 0 1 .63.15Z" clip-rule="evenodd" />
              </svg>


              {/* Info Icon - Heroicons Mini */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className="text-xs font-bold text-primary-blue tracking-[0.1em]">Podcast</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mute Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-transparent shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative">
            <div className="p-[5px] relative h-full">
              {/* Speaker Icon - Heroicons */}
              <svg className="absolute top-2 left-2 w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
              </svg>


              {/* Info Icon - Heroicons Mini */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className="text-xs font-bold text-primary-blue tracking-[0.1em]">會議模式</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-transparent shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative">
            <div className="p-[5px] relative h-full">
              {/* Phone Icon - Heroicons */}
              <svg className="absolute top-2 left-2 w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
              </svg>


              {/* Info Icon - Heroicons Mini */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>

              {/* Label */}
              <div className="absolute bottom-1 left-2">
                <span className="text-xs font-bold text-primary-blue tracking-[0.1em]">印刷廠商的電話</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Card 1 */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-dashed border-[#1577FF] border-opacity-30 shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative flex items-center justify-center">
            <svg className="w-6 h-6 text-light-blue" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>
        </div>

        {/* Add Card 2 */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-[10px] bg-white/30 backdrop-blur-sm border border-dashed border-[#1577FF] border-opacity-30 shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.4),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] relative flex items-center justify-center">
            <svg className="w-6 h-6 text-light-blue" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 6v12m6-6H6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionCards
