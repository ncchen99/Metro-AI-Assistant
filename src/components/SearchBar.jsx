const SearchBar = ({ mode = 'work' }) => {

  return (
    <div className="relative z-10 px-11 pb-4">
      {/* Search Container */}
      <div className="w-[306px] h-[29px] bg-white/30 backdrop-blur-sm shadow-[0_2px_4px_0_rgba(0,0,0,0.1),inset_1px_1px_2px_0_rgba(255,255,255,0.6),inset_-1px_-1px_2px_0_rgba(0,0,0,0.05)] rounded-full mx-auto relative flex items-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="詢問任何問題"
          className="w-full h-full bg-transparent rounded-full px-4 py-2 text-sm font-bold text-text-muted tracking-[0.8px] placeholder-text-muted border-0 outline-none"
        />

        {/* Microphone Icon - Heroicons Mini */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className={`w-4 h-4 ${mode === 'work' ? 'text-primary-blue' : 'text-travel-green'}`} fill=" currentColor" viewBox="0 0 20 20">
            <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
            <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
          </svg>
        </div>
      </div>
    </div >
  )
}

export default SearchBar
