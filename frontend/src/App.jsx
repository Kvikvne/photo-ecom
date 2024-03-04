import "./App.css";
import Nav from "./components/Navigation/Nav";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ProductAll from "./pages/ProductAll";
import Testing from "./components/Shop/Checkout/Testing";
import ProductPage2 from "./pages/ProductPage2";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import MyOrders from "./pages/MyOrders";
import Footer from "./components/Home/Footer";
import About from "./pages/About";
import ProductMain from "./pages/ProductMain";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COLORS
// #f0ede6 #06151c #e1ad81

function App() {
  return (
    <div className="mainContainer">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductMain />} />
          <Route path="/products/:tag" element={<ProductAll />} />
          <Route path="/products/:tag/:productId" element={<ProductPage2 />} />
          <Route path="/checkout-shipping" element={<CheckoutPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/about" element={<About />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
