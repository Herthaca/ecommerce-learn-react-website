import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Checkout from './pages/Checkout.jsx'
import './App.css'
import Navbar from './component/Navbar.jsx'

function App() {
  
  return(
  <div className="App">
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
  </div>
  );
}

export default App
