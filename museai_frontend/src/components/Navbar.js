import React from 'react'
import '../style/style.css'




export default function Navbar() {
    return (
        <nav className="navbar navbar-light bg-dark p-4">
            <div className="container">
                <form className="d-flex justify-content-left">
                    <a className="navbar-brand text-light">MuseAI</a>

                    <input className="form-control me-2 bg-secondary" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-secondary" type="submit">Search</button>
                </form>
                <div className="d-flex">

                    <button className="btn btn-secondary me-3" type="submit">Login</button>

                    <button className="btn btn-secondary" type="submit">Sign Up</button>

                </div>
            </div>

        </nav>



    )
}
