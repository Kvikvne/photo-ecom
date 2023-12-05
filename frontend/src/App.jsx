import './App.css'
import Nav from "./components/Navigation/Nav";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Store2 from './pages/ProductPage';
import ProductAll from './pages/ProductAll';
import CheckoutPage from './pages/CheckoutPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"

//---------------------------> TODO <---------------------------
//
// Figure out payment status page. Reroute to an new component with the 
// PaymentStatus.jsx and display the message.
// 
// Get shipping details and store them in the backend to send after the payment succeeded.
// probably have to add a new collection with all the info needed for the printify post. 
// (sort through all data collected and create a formatted database collection for printify data)
// 
// Make sure the shopping cart is session based and users have their own cart.
// may require a database rework
//
// add cart item deletion function and quantity select
//
// Work on small things (styles, cart push notifications, ect.)



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
