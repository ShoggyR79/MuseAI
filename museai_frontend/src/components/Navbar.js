import { Button } from '@material-ui/core'
import React from 'react'
import '../style/style.css'
import { useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';




export default function Navbar() {
    const { user, logOut } = UserAuth()
    // console.log(user)
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }
    const renderLog = () => {
        if (user?.displayName) {
            return (
                <form className="d-flex justify-content-left">
                    <a className="navbar-brand text-light" style={{ cursor: 'pointer' }} >{user.displayName}</a>
                    <button className="btn btn-secondary" type="submit" onClick={handleSignOut}>Log Out</button>
                </form >
            )
        } else {
            return (
                <div>
                    <button className="btn btn-secondary me-3" onClick={() => navigate('/login')}>Login</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            )
        }
    }
    return (
        <nav className="navbar navbar-light bg-dark p-4">

            <div className="container">
                <form className="d-flex justify-content-left">
                    <a className="navbar-brand text-light" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>MuseAI</a>
                    <input className="form-control me-2 bg-secondary" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-secondary" type="submit">Search</button>
                </form>
                <div className="d-flex">
                    {renderLog()}
                </div>
            </div>

        </nav>



    )
}
