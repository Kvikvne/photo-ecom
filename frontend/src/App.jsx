import './App.css'
import Nav from "./components/Navigation/Nav";
import Home from './components/Home/Home';
import Cart from './components/Shop/Cart/Cart';
import Store2 from './components/Shop/Detail-View/ProductPage';
import ProductAll from './components/Shop/All-View/ProductAll';
import CheckoutPage from './components/Shop/Checkout/CheckoutPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App( ) {
  
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/prints' element={<ProductAll />} />
        <Route path="/prints/:productId" element={<Store2 />} />
        <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
