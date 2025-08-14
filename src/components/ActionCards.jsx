const ActionCards = () => {
  return (
    <div className="relative z-10 px-4 py-4">
      {/* Card Grid */}
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        {/* My Ticket Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-xl bg-card-bg border border-transparent shadow-sm relative">
            <div className="p-2">
              {/* Card Icon */}
              <svg className="w-4 h-3.5 text-primary-blue" fill="currentColor" viewBox="0 0 16 15">
                <path d="M0.517747 2.54185C1.12798 1.99717 1.92962 1.66667 2.80761 1.66667H13.1922C14.0702 1.66667 14.8718 1.99717 15.4821 2.54185C15.3402 1.39075 14.3691 0.5 13.1922 0.5H2.80761C1.63073 0.5 0.659618 1.39075 0.517747 2.54185Z"/>
                <path d="M0.517747 4.87518C1.12798 4.33051 1.92962 4 2.80761 4H13.1922C14.0702 4 14.8718 4.33051 15.4821 4.87518C15.3402 3.72409 14.3691 2.83333 13.1922 2.83333H2.80761C1.63073 2.83333 0.659618 3.72409 0.517747 4.87518Z"/>
                <path d="M2.80769 5.16667C1.53319 5.16667 0.5 6.21134 0.5 7.5V12.1667C0.5 13.4553 1.53319 14.5 2.80769 14.5H13.1923C14.4668 14.5 15.5 13.4553 15.5 12.1667V7.5C15.5 6.21134 14.4668 5.16667 13.1923 5.16667H10.3077C9.98907 5.16667 9.73077 5.42783 9.73077 5.75C9.73077 6.7165 8.95588 7.5 8 7.5C7.04412 7.5 6.26923 6.7165 6.26923 5.75C6.26923 5.42783 6.01093 5.16667 5.69231 5.16667H2.80769Z"/>
              </svg>
              
              {/* Info Icon */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                <path d="M5.54167 5.54167L5.56702 5.52899C5.91726 5.35387 6.31161 5.67021 6.21664 6.0501L5.78336 7.78324C5.68839 8.16312 6.08274 8.47946 6.43298 8.30434L6.45833 8.29167M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6ZM6 3.70833H6.00458V3.71292H6V3.70833Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Label */}
              <div className="absolute bottom-2 left-2">
                <span className="text-xs font-bold text-primary-blue tracking-wide">我的票卡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Podcast Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-xl bg-card-bg border border-transparent shadow-sm relative">
            <div className="p-2">
              {/* Podcast Icon */}
              <svg className="w-4 h-4 text-primary-blue" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.7923 2.10719C12.923 2.20764 12.9999 2.36476 12.9999 2.53156V5.17759C13 5.18562 13 5.19362 12.9999 5.20161V12.4914C12.9999 13.4407 12.3822 14.275 11.4863 14.5358L10.568 14.8031C9.4336 15.1333 8.3043 14.2654 8.3043 13.0634C8.3043 12.2555 8.8299 11.5456 9.5923 11.3237L11.1996 10.8558C11.6476 10.7254 11.9564 10.3082 11.9564 9.8336V5.89403L5.6956 7.7165V14.6176C5.6956 15.5669 5.0779 16.4012 4.182 16.662L3.2638 16.9293C2.1293 17.2595 1 16.3917 1 15.1896C1 14.3818 1.52562 13.6718 2.288 13.4499L3.8953 12.982C4.3433 12.8516 4.6521 12.4345 4.6521 11.9598V7.3273C4.652 7.3193 4.652 7.3113 4.6521 7.3033V4.65778C4.6521 4.42045 4.8066 4.21188 5.0305 4.14668L12.3348 2.02046C12.4922 1.97463 12.6616 2.00675 12.7923 2.10719Z"/>
              </svg>
              
              {/* Info Icon */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                <path d="M5.54167 5.54167L5.56702 5.52899C5.91726 5.35387 6.31161 5.67021 6.21664 6.0501L5.78336 7.78324C5.68839 8.16312 6.08274 8.47946 6.43298 8.30434L6.45833 8.29167M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6ZM6 3.70833H6.00458V3.71292H6V3.70833Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Label */}
              <div className="absolute bottom-2 left-2">
                <span className="text-xs font-bold text-primary-blue tracking-wide">打開Podcast</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mute Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-xl bg-card-bg border border-transparent shadow-sm relative">
            <div className="p-2">
              {/* Mute Icon */}
              <svg className="w-4 h-4 text-primary-blue" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.5714 3.11424C9.5714 2.12355 8.4174 1.6274 7.7424 2.32793L4.5281 5.66397H3.1493C2.3341 5.66397 1.49361 6.1565 1.2495 7.0763C1.08676 7.6894 1 8.3346 1 9C1 9.6654 1.08676 10.3106 1.2495 10.9237C1.49361 11.8435 2.3341 12.336 3.1493 12.336H4.5281L7.7424 15.6721C8.4174 16.3726 9.5714 15.8765 9.5714 14.8858V3.11424Z"/>
                <path d="M12.6288 6.9388C12.4196 6.7217 12.0804 6.7217 11.8712 6.9388C11.662 7.156 11.662 7.508 11.8712 7.7251L13.0995 9L11.8712 10.2749C11.662 10.492 11.662 10.844 11.8712 11.0612C12.0804 11.2783 12.4196 11.2783 12.6288 11.0612L13.8571 9.7863L15.0855 11.0612C15.2947 11.2783 15.6339 11.2783 15.8431 11.0612C16.0523 10.844 16.0523 10.492 15.8431 10.2749L14.6148 9L15.8431 7.7251C16.0523 7.508 16.0523 7.156 15.8431 6.9388C15.6339 6.7217 15.2947 6.7217 15.0855 6.9388L13.8571 8.2137L12.6288 6.9388Z"/>
              </svg>
              
              {/* Info Icon */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                <path d="M5.54167 5.54167L5.56702 5.52899C5.91726 5.35387 6.31161 5.67021 6.21664 6.0501L5.78336 7.78324C5.68839 8.16312 6.08274 8.47946 6.43298 8.30434L6.45833 8.29167M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6ZM6 3.70833H6.00458V3.71292H6V3.70833Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Phone Card */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-xl bg-card-bg border border-transparent shadow-sm relative">
            <div className="p-2">
              {/* Phone Icon */}
              <svg className="w-4 h-4 text-primary-blue" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" clipRule="evenodd" d="M1 4C1 2.89543 1.89543 2 3 2H3.9144C4.488 2 4.988 2.39037 5.1271 2.94683L5.8643 5.89562C5.9863 6.3835 5.804 6.897 5.4016 7.1988L4.5392 7.8456C4.4496 7.9128 4.4302 8.0111 4.4553 8.0798C5.2123 10.1463 6.8537 11.7877 8.9202 12.5447C8.9889 12.5698 9.0872 12.5504 9.1544 12.4608L9.8012 11.5984C10.103 11.196 10.6165 11.0137 11.1044 11.1357L14.0532 11.8729C14.6096 12.012 15 12.512 15 13.0856V14C15 15.1046 14.1046 16 13 16H11.5C5.701 16 1 11.299 1 5.5V4Z"/>
              </svg>
              
              {/* Info Icon */}
              <svg className="w-3 h-3 absolute top-2 right-2 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 12 12">
                <path d="M5.54167 5.54167L5.56702 5.52899C5.91726 5.35387 6.31161 5.67021 6.21664 6.0501L5.78336 7.78324C5.68839 8.16312 6.08274 8.47946 6.43298 8.30434L6.45833 8.29167M11.5 6C11.5 9.03757 9.03757 11.5 6 11.5C2.96243 11.5 0.5 9.03757 0.5 6C0.5 2.96243 2.96243 0.5 6 0.5C9.03757 0.5 11.5 2.96243 11.5 6ZM6 3.70833H6.00458V3.71292H6V3.70833Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Add Card 1 */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-xl bg-card-bg border border-dashed border-light-blue border-opacity-30 shadow-sm relative flex items-center justify-center">
            <svg className="w-6 h-6 text-light-blue" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 6v12m6-6H6"/>
            </svg>
          </div>
        </div>

        {/* Add Card 2 */}
        <div className="relative">
          <div className="w-[107px] h-[70px] rounded-xl bg-card-bg border border-dashed border-light-blue border-opacity-30 shadow-sm relative flex items-center justify-center">
            <svg className="w-6 h-6 text-light-blue" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 6v12m6-6H6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActionCards
