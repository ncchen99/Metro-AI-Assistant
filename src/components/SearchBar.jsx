const SearchBar = () => {
  return (
    <div className="relative z-10 px-11 py-2">
      <div className="w-[306px] h-[29px] bg-transparent rounded-full shadow-[0_2px_1px_rgba(0,0,0,0.20)] px-[15px] py-[7px] flex items-center justify-between">
        
        {/* Placeholder Text */}
        <span className="text-xs font-bold text-text-muted tracking-[0.8px] leading-[140%]">
          詢問任何問題
        </span>
        
        {/* Microphone Icon */}
        <svg className="w-[9px] h-[15px]" fill="#112A4C" viewBox="0 0 9 15">
          <path d="M2 2.5C2 1.11929 3.11929 0 4.5 0C5.88071 0 7 1.11929 7 2.5V8C7 9.38071 5.88071 10.5 4.5 10.5C3.11929 10.5 2 9.38071 2 8V2.5Z"/>
          <path d="M0.5 6.5C0.776142 6.5 1 6.72386 1 7V8C1 9.933 2.567 11.5 4.5 11.5C6.433 11.5 8 9.933 8 8V7C8 6.72386 8.22386 6.5 8.5 6.5C8.77614 6.5 9 6.72386 9 7V8C9 10.3163 7.24998 12.2238 5 12.4725V14H7C7.27614 14 7.5 14.2239 7.5 14.5C7.5 14.7761 7.27614 15 7 15H2C1.72386 15 1.5 14.7761 1.5 14.5C1.5 14.2239 1.72386 14 2 14H4V12.4725C1.75002 12.2238 0 10.3163 0 8V7C0 6.72386 0.223858 6.5 0.5 6.5Z"/>
        </svg>
      </div>
    </div>
  )
}

export default SearchBar
