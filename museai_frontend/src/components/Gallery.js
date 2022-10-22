import React, {useState} from 'react'
import '../gallery.css'
import CloseIcon from '@material-ui/icons/Close'
import {FcLike} from "react-icons/fc";
import { TfiHeart } from "react-icons/tfi";
import {AiFillEye, AiOutlineComment} from "react-icons/ai";


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
            user: 'user1',
            prompt: 'An annoying alarm ringing for 30 minutes with mosquitos flying nearby',
            caption: 'A clock',
            likes: 10,
            views: 10,
            comments: ['1'],
            commentsLen: 1
        },
        {
            img: Img2,
            audio: '',
            user: 'user2',
            prompt: 'Birthday in 2050',
            caption: 'A birthday party',
            likes: 10,
            views: 10,
            comments: ['1'],
            commentsLen: 1
        },
        {
            img: Img3,
            audio: '',
            user: 'user3',
            prompt: 'fantasy land, huge stone castles, covered in clouds, surrounded by mountains, rainy weather, steam punk',
            caption: 'A castle',
            likes: 10,
            views: 10,
            comments: ['1'],
            commentsLen: 1
        },
        {
            img: Img4,
            audio: '',
            user: 'user4',
            prompt: 'A magical town with tall crooked buildings, deformed tall buildings, slanted tall buildings, inspired by amsterdam and victorian england, night time, digital painting, highly detailed, concept art, game art, matte painting, trending on artstation, octane render, 8 k, unreal engine',
            caption: 'A city',
            likes: 10,
            views: 10,
            comments: ['1'],
            commentsLen: 1
        },
        {
            img: Img5,
            audio: '',
            user: 'user5',
            prompt: 'Old expensive organ playing itself in a Ancient Satan Church',
            caption: 'An organ',
            likes: 10,
            views: 10,
            comments: ['1'],
            commentsLen: 1
        },
        {
            img: Img6,
            audio: '',
            user: 'user6',
            prompt: 'Dark wolf mage, spell, fog, potion, magic the gathering artwork, d&d, fantasy, cinematic lighting, centered, symmetrical, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, volumetric lighting, epic composition, 8k, art by akihiko yoshida and greg rutkowski and craig mullins, oil painting, cgsociety',
            caption: 'A wolf',
            likes: 10,
            views: 10,
            comments: ['1'],
            commentsLen: 1
        }
    ]

    const [modal, setModal] = useState(false)
    const [itemModal, setItemModal] = useState('')
    const [like, setLike] = useState(false)

    const getImg = (item) => {
        setItemModal(item)
        setModal(true)
    }


    return (
        <div>
            <div className={modal ? 'modal open' : 'modal'}>
                <CloseIcon className='exit' onClick={()=>setModal(false)}/>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-2'>

                        </div>
                        <div className='col-sm-5 text-center'>
                            <h2>{itemModal.caption}</h2>
                        </div>

                        <div className='col-sm-5 text-center'>
                            <h2>{itemModal.user}</h2>
                        </div>
                        
                    </div>

                    <div className='row text-center text-center'>
                        <div className='col-sm-7'>

                        </div>
                        <div className='col-sm-5 text-center'>
                            <h4>150 Followers</h4>
                        </div>
                        
                    </div>

                    <div className='row'>
                        <div className='col-sm-2'>

                        </div>
                        <div className='col-sm-5 justify-content-start'>
                            
                            <img src={itemModal.img}/>
                            
                        </div>

                        <div className='col-sm-5 justify-content-center'>
                            

                            <div className='row top-buffer text-center'>
                                <h5>{itemModal.prompt}</h5>

                            </div>

                            <div className='row top-buffer text-center'>
                                <div className='col-sm-4 justify-content-end'>
                                    {like ? (<FcLike size={50} onClick={()=>setLike(false)}/>) : (<TfiHeart style={{color:'white'}} size={50} onClick={()=>setLike(true)}/>)}
                                </div>
                                <div className='col-sm-4 justify-content-center'>
                                    <AiFillEye style={{fill:'white'}} size={50}/>
                                </div>
                                <div className='col-sm-4 justify-content-start'>
                                    <AiOutlineComment style={{fill:'white'}} size={50}/>
                                </div>
                            </div>

                            <div className='row top-buffer text-center'>
                                <div className='col-sm-4 justify-content-end'>
                                    {like ? (<h5>{`${itemModal.likes+1} Likes`}</h5>) : <h5>{`${itemModal.likes} Likes`}</h5>}
                                    
                                </div>
                                <div className='col-sm-4 justify-content-center'>
                                    <h5>{`${itemModal.views} Views`}</h5>
                                </div>
                                <div className='col-sm-4 justify-content-start'>
                                    <h5>{`${itemModal.commentsLen} comments`}</h5>
                                </div>
                            </div>
                            

                            

                        </div>

                    </div>
                    
                </div>
                
                
            </div>
            <div className='gallery'>
                {data.map((item, index)=>{
                    return (
                        <div className='thumbnail' key={index} onClick={()=> getImg(item)}>
                            <img src={item.img} style={{width: '100%'}}/>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Gallery