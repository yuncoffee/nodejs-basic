import React from "react"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">LandingPage</Link>
                </li>
                <li>
                    <Link to="/LoginPage">LoginPage</Link>
                </li>
                <li>
                    <Link to="/RegisterPage">RegisterPage</Link>
                </li>
            </ul>

            <hr />
        </>
    )
}

export default NavBar
