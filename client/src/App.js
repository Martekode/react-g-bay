import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Sellpage from "./pages/Sellpage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductPage from "./pages/Product";
import Category from "./pages/Category";
// import axios from "axios";
import Test from "./components/Test";
import NewProduct from "./components/NewProduct";

function App() {

    // axios.get('http://localhost:3050/api/product/id/5')
    //     .then(res => console.log(res.data))

  return (
    <div>
        <Navbar/>
        <NewProduct />
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
        <Routes>
            <Route path="/test" element={<Test />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
