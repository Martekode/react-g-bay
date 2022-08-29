import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Sellpage from "./pages/Sellpage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./pages/Card";
import Dungeons from "./pages/DungeonsAndDragons";
import Miniatures from "./pages/Miniatures";
import Gaming from "./pages/Gaming";
import Other from "./pages/Other";
import Anime from "./pages/Anime";
import Boardgames from "./pages/Boardgames";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export const checkoutArrayState = atom({
    key: 'checkoutArray',
    default: [],
});


function App() {


    // let checkoutArray = [];
    //
    // const setArray = (value) => {
    //     checkoutArray.push(value)
    //     console.log(checkoutArray);
    // };

    // axios.get('http://localhost:3050/api/product/id/5')
    //     .then(res => console.log(res.data))

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
            <Route path="/card" element={<Card />} />
        </Routes>
        <Routes>
            <Route path="/dungeons" element={<Dungeons />} />
        </Routes>
        <Routes>
            <Route path="/miniatures" element={<Miniatures />} />
        </Routes>
        <Routes>
            <Route path="/other" element={<Other />} />
        </Routes>
        <Routes>
            <Route path="/gaming" element={<Gaming />} />
        </Routes>
        <Routes>
            <Route path="/anime" element={<Anime />} />
        </Routes>
        <Routes>
            <Route path="/boardgames" element={<Boardgames />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
