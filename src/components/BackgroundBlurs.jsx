const BackgroundBlurs = ({ mode = 'work' }) => {
  return (
    <>
      {/* Blur Effect 1 - Top area */}
      <div className="absolute w-[213px] h-[314px] rotate-[-91.49deg] rounded-[314px] opacity-30 blur-[75px] left-[43px] top-[96px] z-0">
        <div className={`w-full h-full rounded-full transition-all duration-500 ${
          mode === 'work' ? 'bg-blur-gradient-1' : 'bg-travel-blur-gradient-1'
        }`}></div>
      </div>

      {/* Blur Effect 2 - Middle right */}
      <div className="absolute w-[173px] h-[173px] rotate-[-65.626deg] blur-[75px] left-[235px] top-[302px] z-0">
        <div className={`w-full h-full rounded-full opacity-30 transition-all duration-500 ${
          mode === 'work' ? 'bg-blur-gradient-2' : 'bg-travel-blur-gradient-2'
        }`}></div>
      </div>

      {/* Blur Effect 3 - Left side */}
      <div className="absolute w-[213px] h-[314px] rotate-[-91.49deg] rounded-[314px] blur-[75px] left-[-211px] top-[222px] z-0">
        <div className={`w-full h-full opacity-20 rounded-full transition-all duration-500 ${
          mode === 'work' ? 'bg-primary-blue' : 'bg-travel-green'
        }`}></div>
      </div>

      {/* Blur Effect 4 - Bottom */}
      <div className="absolute w-[451px] h-[451px] rotate-[-142.151deg] rounded-full blur-[75px] left-[-208px] top-[452px] z-0">
        <div className={`w-full h-full opacity-30 rounded-full transition-all duration-500 ${
          mode === 'work' ? 'bg-blur-gradient-3' : 'bg-travel-blur-gradient-3'
        }`}></div>
      </div>
    </>
  )
}

export default BackgroundBlurs
