import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

import LandingPage from "./components/views/LandingPage/LandingPage"
// import NavBar from "./components/views/Navbar/NavBar"
import NavBar from "./components/views/NavBar/NavBar"

import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import Auth from "./hoc/auth"

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={Auth(LandingPage, null, true)} />
                <Route path="/LoginPage" element={Auth(LoginPage, false)} />
                <Route
                    path="/RegisterPage"
                    element={Auth(RegisterPage, false)}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
