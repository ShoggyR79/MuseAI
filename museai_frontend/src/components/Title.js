import React from 'react'
import "../style/style.css"
import logo from '../assets/logo.jpg'

export default function Title() {
    return (
        <div className='title'>
            {/* <div classN>

            </div> */}
            <div className='row'>
                {/* <div className='col-sm-5'>

                </div> */}
                <div className='col-12 justify-content-center d-flex mt-4'>
                    <img src={logo} style={{width: '100px',height: '100px'}}/>
                </div>

            </div>
            <h1 style={{ textAlign: 'center', fontSize: "5rem" }} className="text-light">MuseAI</h1>
            <h4 style={{ textAlign: 'center' }} className="text-light">Community Board</h4>
        </div>
    )
}
