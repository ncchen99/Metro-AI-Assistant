const Header = ({ mode, onModeChange }) => {
  return (
    <div className="relative px-5 pt-1 pb-4 z-10">
      {/* Chinese language indicator */}
      <div className="absolute left-[14px] top-[46px] flex items-center gap-1 bg-white border-[5px] border-white px-2 py-1">
        <svg className="w-6 h-6 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 21C16.1926 21 19.7156 18.1332 20.7157 14.2529M12 21C7.80742 21 4.28442 18.1332 3.2843 14.2529M12 21C14.4853 21 16.5 16.9706 16.5 12C16.5 7.02944 14.4853 3 12 3M12 21C9.51472 21 7.5 16.9706 7.5 12C7.5 7.02944 9.51472 3 12 3M12 3C15.3652 3 18.299 4.84694 19.8431 7.58245M12 3C8.63481 3 5.70099 4.84694 4.15692 7.58245M19.8431 7.58245C17.7397 9.40039 14.9983 10.5 12 10.5C9.00172 10.5 6.26027 9.40039 4.15692 7.58245M19.8431 7.58245C20.5797 8.88743 21 10.3946 21 12C21 12.778 20.9013 13.5329 20.7157 14.2529M20.7157 14.2529C18.1334 15.6847 15.1619 16.5 12 16.5C8.8381 16.5 5.86662 15.6847 3.2843 14.2529M3.2843 14.2529C3.09871 13.5329 3 12.778 3 12C3 10.3946 3.42032 8.88743 4.15692 7.58245" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-text-gray font-bold text-lg">中文</span>
      </div>

      {/* Logo */}
      <div className="flex justify-center items-center py-2">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/a14b6929a1cbc029f820bf5db952573695a39273?width=264" 
          alt="台北捷運 LOGO" 
          className="w-33 h-[17px]"
        />
      </div>

      {/* Mode Toggle - Work mode */}
      <div className="absolute right-5 top-[46px] w-[60px] h-[26px]">
        <div className="relative w-[60px] h-[26px]">
          <div className="absolute w-[54px] h-[18px] rounded-[13px] bg-primary-blue left-0 top-1"></div>
          <div className="absolute w-[26px] h-[26px] rounded-full border-2 border-gray-100 bg-gray-100 shadow-lg left-[34px] top-0"></div>
          <span className="absolute text-xs text-white font-inter left-2 top-0 leading-[26px]">工作</span>
        </div>
      </div>

      {/* Edit Button */}
      <div className="absolute right-[13px] top-[85px] w-[22px] h-[22px] bg-gray-100 rounded-lg flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-text-gray" fill="currentColor" viewBox="0 0 14 14">
          <path d="M13.4874 0.51256C12.804 -0.17085 11.696 -0.17085 11.0126 0.51256L10.2411 1.284L12.716 3.75887L13.4874 2.98743C14.1709 2.30402 14.1709 1.19598 13.4874 0.51256Z"/>
          <path d="M12.0089 4.46598L9.534 1.99111L1.43347 10.0917C1.02228 10.5029 0.72002 11.01 0.55401 11.5673L0.02082 13.3572C-0.03159 13.5332 0.01664 13.7237 0.14646 13.8535C0.27628 13.9834 0.4668 14.0316 0.64275 13.9792L2.43268 13.446C2.98999 13.28 3.49716 12.9777 3.90835 12.5665L12.0089 4.46598Z"/>
        </svg>
      </div>

      {/* Top additional image */}
      <img 
        src="https://api.builder.io/api/v1/image/assets/TEMP/bbf3c19f1d80013c2c559474e9bd1975a2fe6c94?width=218" 
        alt="" 
        className="absolute w-[109px] h-[36px] left-[-11px] top-[51px]"
      />
    </div>
  )
}

export default Header
