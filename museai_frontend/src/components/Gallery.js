import React, {useState} from 'react'
import '../gallery.css'
import CloseIcon from '@material-ui/icons/Close'

import Img1 from '../assets/alarm.png'
import Img2 from '../assets/bday.png'
import Img3 from '../assets/castle.png'
import Img4 from '../assets/city.png'
import Img5 from '../assets/organ.png'
import Img6 from '../assets/wolf.png'

const Gallery = () => {
    let data = [
        {
            img: Img1,
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: Img2,
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: Img3,
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: Img4,
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: Img5,
            audio: '',
            user: '',
            prompt: ''
        },
        {
            img: Img6,
            audio: '',
            user: '',
            prompt: ''
        }
    ]

    const [modal, setModal] = useState(false)
    const [imgSrc, setImgSrc] = useState('')
    const getImg = (img) => {
        setImgSrc(img)
        setModal(true)
        console.log(imgSrc)
    }

    return (
        <div>
            <div className={modal ? 'modal open' : 'modal'}>
                <CloseIcon onClick={()=>setModal(false)}/>
                <div className='container'>
                    {/* <div className='row'>
                        
                    </div> */}
                    <div className='row'>
                        <div className='col-sm-8 justify-content-start'>
                            {/* <h1 style={{color:}}>Caption</h1> */}
                            <img src={imgSrc}/>
                        </div>

                    </div>
                    
                </div>
                
                
            </div>
            <div className='gallery'>
                {data.map((item, index)=>{
                    return (
                        <div className='thumbnail' key={index} onClick={()=> getImg(item.img)}>
                            <img src={item.img} style={{width: '100%'}}/>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Gallery