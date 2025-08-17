import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import usePageTitle from "../hooks/usePageTitle";
import PageTransition from "../components/PageTransition";
import useAnimatedNavigate from "../hooks/useAnimatedNavigate";

function Home() {
  const animatedNavigate = useAnimatedNavigate();
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shakeIcon, setShakeIcon] = useState(null);

  // 設置頁面標題
  usePageTitle("首頁 - 台北捷運智能助手");

  const handleMouseEnter = (featureName, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setTooltip({
      show: true,
      text: featureName,
      x: rect.right + 10,
      y: rect.top + rect.height / 2
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  // 處理圖標點擊事件
  const handleIconClick = (featureName, event) => {
    // 有功能的圖標
    const functionalIcons = ["主頁", "捷運路線", "捷運小幫手", "路線擁擠程度", "GO優惠", "捷運點", "AI助理"];

    if (functionalIcons.includes(featureName)) {
      if (featureName === "主頁") {
        animatedNavigate("/demo/main", event);
      } else if (featureName === "AI助理") {
        animatedNavigate("/ai-assistant", event);
      } else {
        animatedNavigate(`/demo/${encodeURIComponent(featureName)}`, event);
      }
    } else {
      // 沒有功能的圖標，觸發搖晃動畫
      setShakeIcon(featureName);
      setTimeout(() => setShakeIcon(null), 1000); // 1秒後清除搖晃狀態
    }
  };

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
      <section id="main-visual" className={styles.homeSection}>
        <div className={styles.mainContainer}>
          <img
            src="/images/background.png"
            alt="Abstract blue wave background with the word METRO"
            className={styles.backgroundImage}
          />
          <img
            src="/images/train.png"
            alt="Abstract blue wave with the word TAIPEI"
            className={styles.taipeiImage}
          />

          {/* Central composition */}
          <div className={styles.centralComposition}>
            <div className={styles.glassPane}></div>
            <div className={styles.modelKit}>
              <img
                src="/images/bone.png"
                alt="Plastic model kit of metro icons"
                className={styles.modelKitBaseImg}
              />
              <div className={styles.modelKitTitleGroup}>
                <div className={styles.titleBackground}></div>
                <p className={styles.titleText}>人形元件工作室</p>
              </div>
            </div>
          </div>

          {/* Floating icons */}
          <div className={styles.floatingIcons}>
            <img
              src="/images/捷運路線.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon1} ${shakeIcon === "捷運路線" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("捷運路線", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("捷運路線", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/動態消息.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon2} ${shakeIcon === "動態消息" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("動態消息", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("動態消息", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/下車提醒.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon3} ${shakeIcon === "下車提醒" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("下車提醒", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("下車提醒", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/更多功能.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon4} ${shakeIcon === "更多功能" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("更多功能", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("更多功能", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/捷運小幫手.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon5} ${shakeIcon === "捷運小幫手" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("捷運小幫手", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("捷運小幫手", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/我的票券.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon6} ${shakeIcon === "我的票券" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("我的票券", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("我的票券", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/主頁.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon7} ${shakeIcon === "主頁" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("主頁", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("主頁", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/GO優惠.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon8} ${shakeIcon === "GO優惠" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("GO優惠", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("GO優惠", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/AI助理.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon9} ${shakeIcon === "AI助理" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("AI助理", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("AI助理", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/路線擁擠程度.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon10} ${shakeIcon === "路線擁擠程度" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("路線擁擠程度", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("路線擁擠程度", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/我的帳戶.png"
              alt="Decorative floating icon"
              className={`${styles.icon} ${styles.icon11} ${shakeIcon === "我的帳戶" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("我的帳戶", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("我的帳戶", e)}
              style={{ cursor: 'pointer' }}
            />
            <img
              src="/images/捷運點.png"
              alt="Decorative floating M logo icon"
              className={`${styles.icon} ${styles.icon12} ${shakeIcon === "捷運點" ? styles.shake : ""}`}
              onMouseEnter={(e) => handleMouseEnter("捷運點", e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleIconClick("捷運點", e)}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* Tooltip */}
          {tooltip.show && (
            <div
              className={styles.tooltip}
              style={{
                left: tooltip.x,
                top: tooltip.y,
                transform: 'translateY(-50%)'
              }}
            >
              {tooltip.text}
            </div>
          )}

          {/* Fullscreen button - positioned at top right of entire screen */}
          <button
            onClick={toggleFullscreen}
            className="fixed top-8 right-8 z-30 p-4 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg rounded-3xl animate-fade-in hover:scale-105 transition-all duration-300"
            title={isFullscreen ? "退出全螢幕" : "進入全螢幕"}
            style={{ position: 'fixed' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-black">
              <path d="m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z" />
            </svg>
          </button>
        </div>
      </section>
    </PageTransition>
  );
}

export default Home;
