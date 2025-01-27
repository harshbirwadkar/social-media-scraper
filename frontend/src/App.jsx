import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 w-full h-full">
        <Home/>
      </div>
    </>
  )
}

export default App
