import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Sellpage from "./pages/Sellpage";
// import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductPage from "./pages/Product";
import Category from "./pages/Category";

function App() {

    // axios.get('product.json')
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log(err));

  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
            <Route path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Routes>
            <Route path="/sell" element={<Sellpage />} />
        </Routes>
        <Routes>
            <Route path="/product" element={<ProductPage />} />
        </Routes>
        <Routes>
            <Route path="/category" element={<Category />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
