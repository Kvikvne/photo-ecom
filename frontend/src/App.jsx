import './App.css'
import Nav from "./components/Navigation/Nav";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Store2 from './pages/ProductPage';
import ProductAll from './pages/ProductAll';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage2 from './pages/ProductPage2';
import { BrowserRouter, Routes, Route } from "react-router-dom"

// COLORS
// #f0ede6 #06151c #e1ad81




function App( ) {
  
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/prints' element={<ProductAll />} />
        <Route path="/prints/:productId" element={<ProductPage2 />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
