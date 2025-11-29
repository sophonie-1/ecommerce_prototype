import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductDetail from './pages/ProductDetail';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './App.css';
import { CartProvider } from './context/CartContext';

function App() {
  return (
  <CartProvider>
    <Router basename="/ecommerce_prototype">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
            <Routes>
            <Route path="/" element={<Home />} />  // Now resolves to /MARZ_Ecommerce/
            <Route path="/products" element={<Products />} />
            {/* <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  </CartProvider>
  );
}

export default App;