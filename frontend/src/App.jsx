import { useState } from 'react'
import './App.css'
import Log_In from './components/Log_In.jsx'
import Sign_Up from './components/Sign_Up.jsx'
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Blog from './components/Blog.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
<div className='main-card'>
<Router>
  <Nav />
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Log_In" element={<Log_In />} />
        <Route path="/Sign_Up" element={<Sign_Up />} />
      </Routes>
  </Router>
  </div>
  )
}

export default App
