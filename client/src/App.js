import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useFetch from './useFetch'
import './App.css';
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Sellpage from "./pages/Sellpage";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



function App() {

    axios.get('product.json')
        .then(res => console.log(res.data))

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
        <Footer/>
    </div>
  );

    const [data, loading] = useFetch('/api');

    if (loading) {
        return <div>loading...</div>
    }

    return <h1 className="text-3xl font-bold underline">{data.message}</h1>;


}
export default App;
