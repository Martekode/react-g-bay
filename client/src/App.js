import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useFetch from './useFetch'
import './App.css';
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Sellpage from "./pages/Sellpage";


function App() {
  return (
    <div>
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
    </div>
  );

    const [data, loading] = useFetch('/api');

    if (loading) {
        return <div>loading...</div>
    }

    return <h1 className="text-3xl font-bold underline">{data.message}</h1>;

}

export default App;
