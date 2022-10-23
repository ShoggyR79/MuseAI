import React from 'react'
import "../style/style.css"

export default function Title() {
    return (
        <div className='title'>
            <h1 style={{ textAlign: 'center', fontSize: "5rem" }} className="text-light">MuseAI</h1>
            <h4 style={{ textAlign: 'center' }} className="text-light">Community Board</h4>
        </div>
    )
}