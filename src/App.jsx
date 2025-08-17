import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AIAssistant from './pages/AIAssistant'
import Demo from './pages/Demo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demo/:feature" element={<Demo />} />
      </Routes>
    </Router>
  )
}

export default App
