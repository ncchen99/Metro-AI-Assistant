import React, { useState } from "react";
import styles from "./Home.module.css";

function Home() {
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

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

  return (
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
            className={`${styles.icon} ${styles.icon1}`}
            onMouseEnter={(e) => handleMouseEnter("捷運路線", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/動態消息.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon2}`}
            onMouseEnter={(e) => handleMouseEnter("動態消息", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/下車提醒.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon3}`}
            onMouseEnter={(e) => handleMouseEnter("下車提醒", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/更多功能.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon4}`}
            onMouseEnter={(e) => handleMouseEnter("更多功能", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/捷運小幫手.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon5}`}
            onMouseEnter={(e) => handleMouseEnter("捷運小幫手", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/我的票券.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon6}`}
            onMouseEnter={(e) => handleMouseEnter("我的票券", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/主頁.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon7}`}
            onMouseEnter={(e) => handleMouseEnter("主頁", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/GO優惠.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon8}`}
            onMouseEnter={(e) => handleMouseEnter("GO優惠", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/AI助理.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon9}`}
            onMouseEnter={(e) => handleMouseEnter("AI助理", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/路線擁擠程度.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon10}`}
            onMouseEnter={(e) => handleMouseEnter("路線擁擠程度", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/我的帳戶.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon11}`}
            onMouseEnter={(e) => handleMouseEnter("我的帳戶", e)}
            onMouseLeave={handleMouseLeave}
          />
          <img
            src="/images/捷運點.png"
            alt="Decorative floating M logo icon"
            className={`${styles.icon} ${styles.icon12}`}
            onMouseEnter={(e) => handleMouseEnter("捷運點", e)}
            onMouseLeave={handleMouseLeave}
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
      </div>
    </section>
  );
}

export default Home;
