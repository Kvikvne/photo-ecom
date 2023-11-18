import './App.css'
import Nav from "./components/Navigation/Nav";
import Home from './components/Home/Home';
import Cart from './components/Shop/Cart';
import Store from './components/Shop/Store';
import Store2 from './components/Shop/Store2';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App( ) {
  
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/testing' element={<Store2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
