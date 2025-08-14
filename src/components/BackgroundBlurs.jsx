const BackgroundBlurs = () => {
  return (
    <>
      {/* Blur Effect 1 - Top area */}
      <div className="absolute w-[213px] h-[314px] rotate-[-91.49deg] rounded-[314px] opacity-30 blur-[75px] left-[43px] top-[96px] z-0">
        <div className="w-full h-full bg-blur-gradient-1 rounded-full"></div>
      </div>

      {/* Blur Effect 2 - Middle right */}
      <div className="absolute w-[173px] h-[173px] rotate-[-65.626deg] blur-[75px] left-[235px] top-[302px] z-0">
        <div className="w-full h-full bg-blur-gradient-2 rounded-full opacity-30"></div>
      </div>

      {/* Blur Effect 3 - Left side */}
      <div className="absolute w-[213px] h-[314px] rotate-[-91.49deg] rounded-[314px] blur-[75px] left-[-211px] top-[222px] z-0">
        <div className="w-full h-full bg-primary-blue opacity-20 rounded-full"></div>
      </div>

      {/* Blur Effect 4 - Bottom */}
      <div className="absolute w-[451px] h-[451px] rotate-[-142.151deg] rounded-full blur-[75px] left-[-208px] top-[452px] z-0">
        <div className="w-full h-full bg-blur-gradient-3 opacity-30 rounded-full"></div>
      </div>
    </>
  )
}

export default BackgroundBlurs
