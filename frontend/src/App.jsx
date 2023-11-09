import './App.css'
import Nav from "./components/Nav";
import Home from './components/Home';
import Prints from './components/Prints';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App( ) {
  
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prints' element={<Prints />}/>
        <Route path="/:id" element={<ProductPage />}/>
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
