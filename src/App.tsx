import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import CountryData from './components/CountryData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <CountryData />
    </div>
  )
}

export default App
