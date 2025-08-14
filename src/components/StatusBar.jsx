const StatusBar = () => {
  return (
    <div className="flex w-full h-11 px-5 py-3 justify-between items-center z-20 relative">
      {/* Time */}
      <div className="text-text-gray font-medium text-lg">9:41</div>
      
      {/* Right side icons */}
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <div className="flex gap-1">
          <div className="w-1 h-3 bg-text-gray rounded-sm"></div>
          <div className="w-1 h-4 bg-text-gray rounded-sm"></div>
          <div className="w-1 h-5 bg-text-gray rounded-sm"></div>
          <div className="w-1 h-6 bg-text-gray rounded-sm"></div>
        </div>
        
        {/* WiFi */}
        <svg className="w-4 h-4 ml-2 text-text-gray" fill="currentColor" viewBox="0 0 30 24">
          <path d="M28.1205 8.7312C29.3961 7.65232 31.2648 7.65232 32.5404 8.7312C32.6044 8.78922 32.6412 8.87139 32.6429 8.95776C32.6446 9.04417 32.6109 9.12769 32.5492 9.18823L30.5521 11.2039C30.4936 11.263 30.4137 11.2966 30.3304 11.2966C30.2472 11.2966 30.1673 11.263 30.1088 11.2039L28.1107 9.18823C28.0491 9.12767 28.0152 9.04412 28.017 8.95776C28.0188 8.87136 28.0564 8.78918 28.1205 8.7312ZM25.4554 6.04175C28.2036 3.4856 32.4592 3.48568 35.2074 6.04175C35.2694 6.10164 35.3051 6.18409 35.306 6.27026C35.3069 6.35649 35.273 6.43955 35.2123 6.50073L34.058 7.66772C33.939 7.78681 33.7465 7.78943 33.6244 7.67358C32.7219 6.85639 31.5479 6.404 30.3304 6.40405C29.1138 6.40456 27.9403 6.85691 27.0385 7.67358C26.9165 7.78923 26.7248 7.78651 26.6058 7.66772L25.4506 6.50073C25.3899 6.43966 25.356 6.35638 25.3568 6.27026C25.3577 6.18409 25.3934 6.10162 25.4554 6.04175ZM22.7904 3.36011C27.0055 -0.679153 33.6555 -0.679344 37.8705 3.36011C37.9314 3.42008 37.9657 3.50217 37.9662 3.58765C37.9667 3.67323 37.9327 3.75544 37.8724 3.81616L36.7172 4.98315C36.5981 5.10288 36.4045 5.10396 36.2836 4.98608C34.6776 3.45931 32.5463 2.60827 30.3304 2.60815C28.1143 2.60815 25.9825 3.45919 24.3763 4.98608C24.2556 5.10399 24.0628 5.10278 23.9437 4.98315L22.7875 3.81616C22.7272 3.7554 22.6932 3.67323 22.6937 3.58765C22.6943 3.50209 22.7294 3.42006 22.7904 3.36011Z"/>
        </svg>
        
        {/* Battery */}
        <div className="ml-2 relative">
          <div className="w-6 h-3 border border-text-gray/35 rounded-sm"></div>
          <div className="w-4 h-2 bg-text-gray rounded-sm absolute top-0.5 left-0.5"></div>
          <div className="w-0.5 h-1 bg-text-gray/40 rounded-r absolute top-1 -right-0.5"></div>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
