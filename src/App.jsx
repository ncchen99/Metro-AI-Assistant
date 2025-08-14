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
    <div className="w-full max-w-mobile mx-auto bg-white min-h-screen relative font-roboto overflow-hidden">
      <BackgroundBlurs />
      <StatusBar />
      <Header mode={mode} onModeChange={setMode} />
      <div className="w-full h-[5px] bg-metro-gradient"></div>
      <ActionCards />
      <AIChat />
      <SearchBar />
      <BottomNavigation />
    </div>
  )
}

export default App
