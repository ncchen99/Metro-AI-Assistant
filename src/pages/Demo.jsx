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
      title: "主頁（旅遊模式/工作模式）",
      subtitle: "Metro AI Assistant",
      description: "**一鍵切換模式**、**自由設定常用功能**，**AI 聰明推薦地點**，讓你的出行更簡單、更貼心",
      features: [
        "**「個性化 Turn On/Off」鍵**，使用者可依需求切換**「工作模式」**或**「旅遊模式」**，AI 助理則依據使用場景主動推薦相關資訊與功能",
        "使用者可**自行編輯常用功能**，提高自主性",
        "**AI 助理**將整合常用站點與鄰近站點資訊，並依據使用者需求，**推薦熱門搜尋地點**，以提升查詢效率與體驗",
      ],
      conclusion: "體驗未來交通的智能化服務，讓每一次出行都變得更加便捷高效。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=119-708&m=dev&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A8836&starting-point-node-id=97%3A3109&embed-host=share&hide-ui=1"
    },
    "捷運路線": {
      title: "捷運路線",
      subtitle: "Metro Route System",
      description: "加入**「歷史紀錄」**、**「AI助理」**、**「儲存地點」**讓捷運路線從單純的交通查詢工具，**升級為以捷運為核心的生活服務平台**",
      features: [
        "**搜尋路線**：快速找到最佳交通或出行方式",
        "**歷史紀錄**：方便回顧常用或曾經搜尋過的地點",
        "**AI 助理**：即時提供建議與情境化查詢，讓搜尋更智慧",
        "**儲存地點**：使用者可建立自己的清單，收藏常用地點，打造個人化資料庫"
      ],
      conclusion: "輕鬆掌握捷運動態，讓您的出行更加順暢便利。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=1-2622&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2622&&embed-host=share&hide-ui=1"
    },
    "捷運小幫手": {
      title: "捷運小幫手",
      subtitle: "Metro Assistant",
      description: "**更改功能名稱**，讓使用者一看就能理解用途；並透過**資訊架構調整**，讓內容瀏覽更**簡潔、直觀**，快速滿足不同使用者的需求",
      features: [
        "由**「Go!Map」**更名為**「捷運小助手」**，提升功能辨識度",
        "**重新優化查詢方式**，快速滿足不同使用者的需求",
        "**雙向查詢**：輸入設施/商家找對應車站，或點選車站查看全部設施與商家資訊",
      ],
      conclusion: "讓AI助手陪伴您的每一趟捷運之旅，享受智慧出行體驗。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=740-562&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A11550&starting-point-node-id=740%3A562&embed-host=share&hide-ui=1"
    },
    "路線擁擠度": {
      title: "路線擁擠度",
      subtitle: "Route Congestion Level",
      description: "**調整擁擠程度顏色**，將路線與人流分開顯示，**減少混淆並提升判讀效率**；同時提供**自由組合路線選取**，滿足不同需求",
      features: [
        "**「路線複選」功能**，使用者可以自由選擇路線查看擁擠程度，加強不同路線之間的銜接以及檢視性",
        "**擁擠程度顏色變更**，將原本的紅橙黃綠換成**紫色的深淺**，顏色越深人越多，避免與路線本身的顏色有衝突",
        "**「顯示模式切換」功能**，避免多樣的顏色造成使用者視覺負荷，可根據需求選擇欲查看的模式",
      ],
      conclusion: "避開人潮高峰，選擇最佳出行時機，享受舒適的捷運體驗。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=166-3193&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A12929&starting-point-node-id=159%3A2392&embed-host=share&hide-ui=1"
    },
    "GO優惠": {
      title: "GO優惠",
      subtitle: "GO Promotions",
      description: "我們透過**重整資訊架構**，讓使用者能**更直觀地瀏覽地圖與商家資訊**，快速找到需要的服務與品牌，並進一步**提升使用體驗**",
      features: [
        "**首頁直覺操作**：直接查看累點數、推薦兌換商品，提升使用者兌換意願",
        "**優化地圖顯示**：一目了然查看附近有哪些地點可「累點」或「消點」，提升探索效率",
        "**AI 助理**：主動推薦附近景點與熱門地點，像咖啡廳或餐廳，讓搜尋更智慧",
        "**商家分類**：依據常去商店快速篩選，立即找到常見品牌，如全家、誠品等"
      ],
      conclusion: "把握每一個優惠機會，讓您的捷運之旅既便利又划算。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=1-7965&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A6871&embed-host=share&hide-ui=1"
    },
    "捷運點": {
      title: "捷運點",
      subtitle: "Metro Points",
      description: "改用**瀑布式瀏覽方式**、導入**點數分級機制**，協助使用者迅速找到所需功能。",
      features: [
        "將**銷點及累點數融合**在同一張地圖，讓使用者更方便使用",
        "商品使用**瀑布式瀏覽**以提高使用者黏著度",
        "確立**點數分級機制**（更符合使用者心態：有多少點數、能換什麼）",
        "**OMO串聯AI助手**打造新兌點模式（不再需要使用者四處搜尋，商家會依據所在位置自動浮現，實現更即時、更貼近生活場景的體驗）"
      ],
      conclusion: "每次搭乘都有收穫，讓點數為您帶來更多驚喜和實惠。",
      iframeSrc: "https://embed.figma.com/proto/tMAW66DZsdvjgcRsNeyXGp/2025-%E5%8C%97%E6%8D%B7%E9%BB%91%E5%AE%A2%E6%9D%BE%EF%BC%88edu-?node-id=1333-7640&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=1%3A12929&starting-point-node-id=1333%3A7640&embed-host=share&hide-ui=1"
    }
  };

  // 獲取當前頁面配置，默認為main
  const currentConfig = pageConfigs[feature] || pageConfigs.main;

  // 設置動態頁面標題
  usePageTitle(`${currentConfig.title} - 捷境 MetroSense`);

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
          src="/images/background2.webp"
          alt=""
          className="object-cover fixed top-0 left-0 w-full h-full z-0"
        />

        {/* Main Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-8 py-8 max-lg:flex-col max-lg:justify-start max-lg:pt-4 max-lg:space-y-4 max-sm:px-4">
          <div className="flex items-center justify-between w-full max-w-7xl gap-16 max-lg:flex-col max-lg:gap-4 max-sm:gap-2">

            {/* Left Side - Description Text */}
            <div className="flex-1 max-w-lg max-lg:text-center">
              <h1 className="text-5xl font-bold mb-8 leading-tight max-md:text-4xl max-sm:text-3xl max-sm:mt-32 max-md:mt-24 text-black">
                {currentConfig.title}
                {/* <span className="block text-3xl font-normal mt-2 text-gray-600 max-md:text-2xl">
                  {currentConfig.subtitle}
                </span> */}
              </h1>

              <div className="space-y-6 text-lg leading-relaxed max-md:text-base max-sm:space-y-4">
                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4 rounded-3xl text-gray-800 max-sm:p-3 max-sm:text-sm">
                  <div dangerouslySetInnerHTML={{ __html: currentConfig.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </div>

                <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-6 rounded-3xl max-sm:p-4">
                  <h3 className="text-xl font-semibold mb-3 text-[#38C693] max-sm:text-lg max-sm:mb-2">主要功能</h3>
                  <ul className="space-y-3 text-gray-800 max-sm:space-y-2 max-sm:text-sm">
                    {currentConfig.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-[#38C693] rounded-full mr-3 max-sm:mr-2 mt-2 flex-shrink-0"></span>
                        <div dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-lg p-4 rounded-3xl text-gray-800 max-sm:p-3 max-sm:text-sm">
                  {currentConfig.conclusion}
                </div> */}
              </div>
            </div>

            {/* Right Side - iPhone Mockup Container */}
            <div className="relative z-10 flex-shrink-0 max-lg:scale-75 max-md:scale-70 mt-auto">
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
