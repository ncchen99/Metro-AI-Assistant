import React from 'react';

function Demo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      {/* Background image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/1aa42c7564cdc89940d5a4a10ff539487538fe11?width=2880"
        alt=""
        className="object-cover fixed top-0 left-0 w-full h-full z-0"
      />

      {/* iPhone Mockup Container */}
      <div className="relative z-10">
        {/* iPhone Frame - Base layer */}
        <svg width="435" height="892" viewBox="0 0 435 892" className="drop-shadow-2xl">
          {/* iPhone Frame - Only the border */}
          <defs>
            <mask id="phoneMask">
              <rect width="435" height="892" fill="white" />
              <rect x="20" y="20" width="395" height="852" rx="45" ry="45" fill="black" />
            </mask>
          </defs>

          {/* Outer frame */}
          <rect x="0" y="0" width="435" height="892" rx="65" ry="65" fill="#1a1a1a" mask="url(#phoneMask)" />

          {/* Inner frame */}
          <rect x="10" y="10" width="415" height="872" rx="55" ry="55" fill="none" stroke="#333" strokeWidth="1" />
        </svg>

        {/* Figma Embed - Positioned inside the frame */}
        <div className="absolute top-[20px] left-[20px] w-[395px] h-[852px] overflow-hidden rounded-[45px]">
          <iframe
            width="395"
            height="852"
            src="https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=119-708&m=dev&scaling=min-zoom&content-scaling=fixed&page-id=1%3A8836&starting-point-node-id=97%3A3109&embed-host=share&hide-ui=1"
            allowFullScreen
            className="border-0"
            style={{ borderRadius: '45px' }}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute shrink-0 w-20 h-20 border-solid shadow-sm border-[5px] border-neutral-400 border-opacity-60 left-[15%] rounded-[56px] bottom-[10%] max-md:left-[10%] max-md:bottom-[15%] max-sm:bottom-[20%] max-sm:h-[60px] max-sm:left-[5%] max-sm:w-[60px] z-10" />
      <div className="absolute shrink-0 border-solid shadow-sm border-[5px] border-neutral-400 border-opacity-60 h-[95px] right-[15%] rounded-[56px] top-[10%] w-[95px] max-md:right-[10%] max-md:top-[15%] max-sm:h-[70px] max-sm:right-[5%] max-sm:top-[10%] max-sm:w-[70px] z-10" />

      {/* Back button */}
      <div className="glass-card absolute left-11 top-[58px] max-md:left-5 max-md:top-[30px] max-sm:top-5 max-sm:left-[15px] z-20">
        <div className="flex justify-center items-center h-full">
          <div className="text-xl font-bold text-black tracking-[8px] max-md:text-base max-md:tracking-[4px] max-sm:text-sm max-sm:tracking-[2px]">
            BACK
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;
