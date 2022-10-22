import React from 'react'

import Img from './assets/alarm.png'
const Gallery = () => {
    let data = [
        {
            img: Img,
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: './assets/bday.png',
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: './assets/castle.png',
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: './assets/city.png',
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: './assets/organ.png',
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: './assets/wolf.png',
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