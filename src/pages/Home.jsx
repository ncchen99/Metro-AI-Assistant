import React from "react";
import styles from "./Home.module.css";

function Home() {
  return (
    <section id="main-visual">
      <div className={styles.mainContainer}>
        <img
          src="/images/a7c955cd739d7fa1381c047fc68c8b4cdbd97586.png"
          alt="Abstract blue wave background with the word METRO"
          className={styles.backgroundImage}
        />
        <img
          src="/images/f38eb832a7a58bb3fc20e33d51eefd3868a6afd4.png"
          alt="Abstract blue wave with the word TAIPEI"
          className={styles.taipeiImage}
        />

        {/* Central composition */}
        <div className={styles.centralComposition}>
          <div className={styles.glassPane}></div>
          <div className={styles.modelKit}>
            <img
              src="/images/b1749039e17e1eb14ab2f6946a9ae0d970b0c5d8.png"
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
            src="/images/720f3137c5377432631e3b01c115b0d296e0591c.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon1}`}
          />
          <img
            src="/images/611c56379776d3d1bb8d4eab9327dbcb45864eea.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon2}`}
          />
          <img
            src="/images/71f8e8d5c99904a5a7ea0cb7ece3eb02f4ee4377.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon3}`}
          />
          <img
            src="/images/100d55b7d2c47af6148eea47f334d35d173cf14a.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon4}`}
          />
          <img
            src="/images/c61ad787d57a24babfd7b4310e4cc7fc879e93c3.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon5}`}
          />
          <img
            src="/images/c203f2499bc4e5f07b5cfc451c0bebe5d147e366.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon6}`}
          />
          <img
            src="/images/8642f00ce718cc4965357d5ceb4241296591bc3b.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon7}`}
          />
          <img
            src="/images/486ec3a079a9f7a8b7af23b12e61eb7f5c4a6e9b.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon8}`}
          />
          <img
            src="/images/7f9fd60e742a88aa4a1d62127c1416eb705db06a.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon9}`}
          />
          <img
            src="/images/cd46516b3b67b055fa9ed3d5d640cfcd232deecf.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon10}`}
          />
          <img
            src="/images/fd74676b7323adacf71f3b80063969fae94b751d.png"
            alt="Decorative floating icon"
            className={`${styles.icon} ${styles.icon11}`}
          />
          <img
            src="/images/406d0c8330c627b342f0b87fe9490bab3cdddad3.png"
            alt="Decorative floating M logo icon"
            className={`${styles.icon} ${styles.icon12}`}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
