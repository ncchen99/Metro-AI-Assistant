import { useState } from 'react'
import StatusBar from './components/StatusBar'
import Header from './components/Header'
import ActionCards from './components/ActionCards'
import AIChat from './components/AIChat'
import SearchBar from './components/SearchBar'
import BottomNavigation from './components/BottomNavigation'
import BackgroundBlurs from './components/BackgroundBlurs'

function App() {
  const [mode, setMode] = useState('work')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      {/* iPhone Mockup Container */}
      <div className="relative">
        {/* iPhone Frame - Base layer */}
        <svg width="435" height="890" viewBox="0 0 435 890" className="drop-shadow-2xl">
          {/* iPhone Frame - Only the border */}
          <defs>
            <mask id="phoneMask">
              <rect width="435" height="890" fill="white" />
              <rect x="20" y="20" width="395" height="850" rx="45" ry="45" fill="black" />
            </mask>
          </defs>

          {/* Outer frame */}
          <rect x="0" y="0" width="435" height="890" rx="65" ry="65" fill="#1a1a1a" mask="url(#phoneMask)" />

          {/* Inner frame */}
          <rect x="10" y="10" width="415" height="870" rx="55" ry="55" fill="none" stroke="#333" strokeWidth="1" />
        </svg>

        {/* App Content - Positioned inside the frame */}
        <div className="absolute top-[20px] left-[20px] w-[395px] h-[850px] overflow-hidden">
          <div className="w-full h-full bg-white relative font-roboto overflow-hidden rounded-[45px]">
            <BackgroundBlurs />
            <Header mode={mode} onModeChange={setMode} />
            <div
              className={`w-full h-[5px] transition-all duration-500 ${
                mode === 'work'
                  ? 'bg-metro-gradient'
                  : 'bg-gradient-to-r from-[#38c693] to-[#1dc971]'
              }`}
            ></div>
            <ActionCards mode={mode} />
            <SearchBar />
            <AIChat mode={mode} />
            <BottomNavigation />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
