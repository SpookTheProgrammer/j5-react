import React from "react"
import logo from "../logo.svg"

export default function Navbar() {
    return (
        <header>
            <nav className="nav">
                <img src={logo} className="nav-logo" alt="logo" />
                <ul className="nav-items">
                    <li>Price</li>
                    <li>Contact</li>
                    <li>About</li>
                </ul>
            </nav>
        </header>
    )
}