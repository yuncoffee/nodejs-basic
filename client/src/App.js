import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

import LandingPage from "./components/views/LandingPage/LandingPage"
// import NavBar from "./components/views/Navbar/NavBar"
import NavBar from "./components/views/NavBar/NavBar"

import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import LoginPage from "./components/views/LoginPage/LoginPage"

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/LoginPage" element={<LoginPage />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
