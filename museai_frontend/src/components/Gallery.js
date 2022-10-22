import React from 'react'

import Img from '../assets/alarm.png'
const Gallery = () => {
    let data = [
        {
            img: Img,
            audio: '',
            user: '',
            prompt: ''
        }
    ]
    return (
        <div className='gallery'>
            {data.map((item, index)=>{
                return (
                    <div className='thumbnail' key={index}>
                        <img src={item.img}/>
                    </div>
                )
            })}
        </div>

    )
}

export default Gallery