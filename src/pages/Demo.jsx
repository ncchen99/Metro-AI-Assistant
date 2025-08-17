import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import PageTransition from '../components/PageTransition';
import useAnimatedNavigate from '../hooks/useAnimatedNavigate';

function Demo() {
  const animatedNavigate = useAnimatedNavigate();
  const { feature } = useParams();
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 頁面配置數據
  const pageConfigs = {
    main: {
      title: "北捷智能助手",
      subtitle: "Metro AI Assistant",
      description: "革命性的智能交通助手，為您的台北捷運之旅提供個性化體驗。",
      features: [
        "智能路線規劃與即時資訊",
        "工作與旅遊模式切換",
        "AI 語音助手整合",
        "個性化推薦服務"
      ],
      conclusion: "體驗未來交通的智能化服務，讓每一次出行都變得更加便捷高效。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=119-708&m=dev&scaling=min-zoom&content-scaling=fixed&page-id=1%3A8836&starting-point-node-id=97%3A3109&embed-host=share&hide-ui=1"
    },
    "捷運路線": {
      title: "捷運路線",
      subtitle: "Metro Route System",
      description: "完整的台北捷運路線資訊，提供即時班次和路線規劃服務。",
      features: [
        "即時路線資訊查詢",
        "最佳路徑規劃",
        "轉乘站點導航",
        "預估到達時間"
      ],
      conclusion: "輕鬆掌握捷運動態，讓您的出行更加順暢便利。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=1-2866&p=f&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2866&embed-host=share&hide-ui=1"
    },
    "捷運小幫手": {
      title: "捷運小幫手",
      subtitle: "Metro Assistant",
      description: "您的專屬捷運導航助手，提供個性化的出行建議和服務。",
      features: [
        "智能語音導航",
        "個人化路線推薦",
        "即時交通狀況",
        "貼心提醒服務"
      ],
      conclusion: "讓AI助手陪伴您的每一趟捷運之旅，享受智慧出行體驗。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=740-562&p=f&scaling=min-zoom&content-scaling=fixed&page-id=1%3A11550&starting-point-node-id=740%3A562&embed-host=share&hide-ui=1"
    },
    "路線擁擠程度": {
      title: "路線擁擠程度",
      subtitle: "Route Congestion Level",
      description: "即時監控各路線的擁擠狀況，幫助您選擇最舒適的出行時間。",
      features: [
        "即時擁擠度顯示",
        "尖峰時段預測",
        "替代路線建議",
        "歷史數據分析"
      ],
      conclusion: "避開人潮高峰，選擇最佳出行時機，享受舒適的捷運體驗。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=166-3193&p=f&scaling=min-zoom&content-scaling=fixed&page-id=1%3A12929&starting-point-node-id=159%3A2392&embed-host=share&hide-ui=1"
    },
    "GO優惠": {
      title: "GO優惠",
      subtitle: "GO Promotions",
      description: "探索最新的捷運優惠活動和折扣方案，讓您的出行更經濟實惠。",
      features: [
        "每日優惠推播",
        "會員專屬折扣",
        "聯名商家優惠",
        "積點兌換服務"
      ],
      conclusion: "把握每一個優惠機會，讓您的捷運之旅既便利又划算。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=1-7965&p=f&scaling=min-zoom&content-scaling=fixed&page-id=1%3A6871&embed-host=share&hide-ui=1"
    },
    "捷運點": {
      title: "捷運點",
      subtitle: "Metro Points",
      description: "累積捷運點數，享受更多專屬權益和兌換服務。",
      features: [
        "點數即時累積",
        "多元兌換選擇",
        "會員等級升級",
        "專屬優惠活動"
      ],
      conclusion: "每次搭乘都有收穫，讓點數為您帶來更多驚喜和實惠。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=421-401&p=f&scaling=min-zoom&content-scaling=fixed&page-id=91%3A498&embed-host=share&hide-ui=1"
    }
  };

  // 獲取當前頁面配置，默認為main
  const currentConfig = pageConfigs[feature] || pageConfigs.main;

  // 設置動態頁面標題
  usePageTitle(`${currentConfig.title} - 台北捷運智能助手`);

  // 當feature改變時重置loading狀態
  useEffect(() => {
    setIsIframeLoaded(false);
    setShowLoading(true);
  }, [feature]);

  // 處理iframe載入和額外等待時間
  useEffect(() => {
    if (isIframeLoaded) {
      // iframe載入後再等待4秒讓prototype完全載入
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isIframeLoaded]);

  // 全螢幕功能
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // 監聽全螢幕狀態變化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Background image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/1aa42c7564cdc89940d5a4a10ff539487538fe11?width=2880"
          alt=""
          className="object-cover fixed top-0 left-0 w-full h-full z-0"
        />

        {/* Main Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-8 max-lg:flex-col max-lg:justify-center max-lg:space-y-8">
          <div className="flex items-center justify-between w-full max-w-7xl gap-16 max-lg:flex-col max-lg:gap-8">

            {/* Left Side - Description Text */}
            <div className="flex-1 max-w-lg max-lg:text-center">
              <h1 className="text-5xl font-bold mb-6 leading-tight max-md:text-4xl text-black">
                {currentConfig.title}
                <span className="block text-3xl font-normal mt-2 text-gray-600 max-md:text-2xl">
                  {currentConfig.subtitle}
                </span>
              </h1>

              <div className="space-y-6 text-lg leading-relaxed max-md:text-base">
                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4 rounded-3xl text-gray-800">
                  {currentConfig.description}
                </div>

                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-6 rounded-3xl">
                  <h3 className="text-xl font-semibold mb-3 text-[#38C693]">主要功能</h3>
                  <ul className="space-y-2 text-gray-800">
                    {currentConfig.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-[#38C693] rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4 rounded-3xl text-gray-800">
                  {currentConfig.conclusion}
                </div>
              </div>
            </div>

            {/* Right Side - iPhone Mockup Container */}
            <div className="relative z-10 flex-shrink-0">
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
                  src={currentConfig.iframeSrc}
                  allowFullScreen
                  className="border-0"
                  style={{ borderRadius: '45px' }}
                  onLoad={() => setIsIframeLoaded(true)}
                />

                {/* Loading animation */}
                {showLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white rounded-[45px]">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 border-8 border-gray-200 border-t-[#38C693] rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}

              </div>

              {/* Glass circles positioned outside iframe container but relative to phone frame */}
              <div className="absolute top-[-40px] right-[-40px] w-28 h-28 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-full z-[9999]"></div>
              <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-full z-[9999]"></div>
            </div>
          </div>
        </div>

        {/* Back button - positioned at top left of entire screen */}

        <button onClick={(e) => animatedNavigate('/', e)} className="fixed top-8 left-8 z-30 px-6 py-3 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-3xl animate-fade-in hover:scale-105 transition-all duration-300">
          <div className="flex justify-center items-center h-full">
            <div className="text-xl font-bold text-black tracking-[8px] max-md:text-base max-md:tracking-[4px] max-sm:text-sm max-sm:tracking-[2px]">
              BACK
            </div>
          </div>
        </button>


        {/* Fullscreen button - positioned at top right of entire screen */}
        <button
          onClick={toggleFullscreen}
          className="fixed top-8 right-8 z-30 p-4 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-3xl animate-fade-in hover:scale-105 transition-all duration-300"
          title={isFullscreen ? "退出全螢幕" : "進入全螢幕"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-black">
            <path d="m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z" />
          </svg>
        </button>
      </div>
    </PageTransition>
  );
}

export default Demo;
