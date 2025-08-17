import React from "react";

function Home() {
  return (
    <section id="main-visual" className="relative w-full h-screen overflow-hidden">
      <div className="main-container relative w-full h-full">
        {/* Background image */}
        <img
          src="/images/a7c955cd739d7fa1381c047fc68c8b4cdbd97586.png"
          alt="Abstract blue wave background with the word METRO"
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />

        {/* Taipei image */}
        <img
          src="/images/f38eb832a7a58bb3fc20e33d51eefd3868a6afd4.png"
          alt="Abstract blue wave with the word TAIPEI"
          className="absolute top-[84.28%] left-0 w-[40.63%] h-[15.72%] z-20"
        />

        {/* Central composition */}
        <div className="central-composition absolute top-0 left-0 w-full h-full z-30">
          {/* Glass pane */}
          <div
            className="glass-pane absolute top-[9.47%] left-[36.18%] w-[33.06%] h-[75.98%] rounded-[56px] z-30"
            style={{
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(184, 184, 184, 0.11) 85.08%)',
              boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)'
            }}
          ></div>

          {/* Model kit */}
          <div className="model-kit absolute top-[9.47%] left-[30.76%] w-[38.47%] h-[81.15%]">
            <img
              src="/images/b1749039e17e1eb14ab2f6946a9ae0d970b0c5d8.png"
              alt="Plastic model kit of metro icons"
              className="model-kit-base-img block w-full h-full"
            />

            {/* Model kit title group */}
            <div className="model-kit-title-group absolute top-[11.52%] left-[8.63%] w-[37.15%] h-[4.4%]">
              <div
                className="title-background absolute top-[18.03%] left-0 w-full h-[82.02%]"
                style={{ backgroundColor: '#add2e1' }}
              ></div>
              <p
                className="title-text absolute top-0 left-[10.05%] w-[89.94%] m-0 font-semibold text-center whitespace-nowrap"
                style={{
                  color: '#253c6b',
                  fontSize: 'clamp(8px, 1.04vw, 15px)',
                  lineHeight: 'clamp(20px, 2.77vw, 40px)',
                  letterSpacing: 'clamp(2px, 0.41vw, 6px)'
                }}
              >
                人形元件工作室
              </p>
            </div>
          </div>
        </div>

        {/* Floating icons */}
        <div className="floating-icons absolute top-0 left-0 w-full h-full z-40 pointer-events-none">
          <img
            src="/images/720f3137c5377432631e3b01c115b0d296e0591c.png"
            alt="Decorative floating icon"
            className="icon absolute top-[44.14%] left-[45.14%] w-[9.65%] h-[11.82%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/611c56379776d3d1bb8d4eab9327dbcb45864eea.png"
            alt="Decorative floating icon"
            className="icon absolute top-[74.9%] left-[37.92%] w-[5.76%] h-[9.57%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/71f8e8d5c99904a5a7ea0cb7ece3eb02f4ee4377.png"
            alt="Decorative floating icon"
            className="icon absolute top-[28.13%] left-[51.88%] w-[6.74%] h-[9.18%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/100d55b7d2c47af6148eea47f334d35d173cf14a.png"
            alt="Decorative floating icon"
            className="icon absolute top-[30.76%] left-[37.01%] w-[4.93%] h-[7.62%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/c61ad787d57a24babfd7b4310e4cc7fc879e93c3.png"
            alt="Decorative floating icon"
            className="icon absolute top-[78.42%] left-[59.58%] w-[5.07%] h-[7.62%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/c203f2499bc4e5f07b5cfc451c0bebe5d147e366.png"
            alt="Decorative floating icon"
            className="icon absolute top-[39.75%] left-[58.61%] w-[6.67%] h-[8.89%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/8642f00ce718cc4965357d5ceb4241296591bc3b.png"
            alt="Decorative floating icon"
            className="icon absolute top-[44.24%] left-[34.38%] w-[6.25%] h-[8.86%]"
            style={{
              boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)',
              transform: 'rotate(-21.93deg)'
            }}
          />
          <img
            src="/images/486ec3a079a9f7a8b7af23b12e61eb7f5c4a6e9b.png"
            alt="Decorative floating icon"
            className="icon absolute top-[78.42%] left-[49.38%] w-[4.86%] h-[6.25%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/7f9fd60e742a88aa4a1d62127c1416eb705db06a.png"
            alt="Decorative floating icon"
            className="icon absolute top-[56.64%] left-[32.43%] w-[8.37%] h-[9.5%]"
            style={{
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              transform: 'rotate(9.55deg)'
            }}
          />
          <img
            src="/images/cd46516b3b67b055fa9ed3d5d640cfcd232deecf.png"
            alt="Decorative floating icon"
            className="icon absolute top-[55.66%] left-[57.43%] w-[6.74%] h-[9.47%]"
            style={{ boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)' }}
          />
          <img
            src="/images/fd74676b7323adacf71f3b80063969fae94b751d.png"
            alt="Decorative floating icon"
            className="icon absolute top-[23.14%] left-[58.68%] w-[7.0%] h-[10.55%]"
            style={{
              boxShadow: '2px 4px 3px 0px rgba(37, 60, 107, 0.69)',
              transform: 'rotate(-25.14deg)'
            }}
          />
          <img
            src="/images/406d0c8330c627b342f0b87fe9490bab3cdddad3.png"
            alt="Decorative floating M logo icon"
            className="icon absolute top-[2.93%] left-[66.94%] w-[11.09%] h-[15.88%]"
            style={{
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              transform: 'rotate(13.97deg)'
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
