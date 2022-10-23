import React, { useState } from 'react'
import '../gallery.css'
import CloseIcon from '@material-ui/icons/Close'
import { FcLike } from "react-icons/fc";
import { TfiHeart } from "react-icons/tfi";
import { AiFillEye, AiOutlineComment, AiOutlineLoading3Quarters} from "react-icons/ai";
import ReactAudioPlayer from 'react-audio-player';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { projectStorage } from "../firebase/config.js"

import Audio1 from '../assets/alarm.mp3'
import Audio2 from '../assets/bday.mp3'
import Audio3 from '../assets/castle.mp3'
import Audio4 from '../assets/city.mp3'
import Audio5 from '../assets/organ.mp3'
import Audio6 from '../assets/wolf.mp3'

import Img1 from '../assets/alarm.png'
import Img2 from '../assets/bday.png'
import Img3 from '../assets/castle.png'
import Img4 from '../assets/city.png'
import Img5 from '../assets/organ.png'
import Img6 from '../assets/wolf.png'
import { useEffect } from 'react';
import { AuthContextProvider } from '../context/AuthContext';
import SelectInput from '@material-ui/core/Select/SelectInput';

const Gallery = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAbQIzCBIKM9UH2xwH-uOYITjZppCAhrbE",
        authDomain: "museai-7da19.firebaseapp.com",
        projectId: "museai-7da19",
        storageBucket: "museai-7da19.appspot.com",
        messagingSenderId: "792426663423",
        appId: "1:792426663423:web:e2b1dcf08f7c2ef485ebca",
        measurementId: "G-4H57BJ3110"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    // const storage = getStorage();
    // console.log(getDownloadURL(ref(projectStorage, 'images/alarm.png')))

    const [data, setData] = useState([])
    const [isLoaded, setIsLoadded] = useState(false)
    useEffect(() => {
        const func = async () => {
            const querySnapshot = await getDocs(collection(db, "post"));
            console.log("start")
            let newData = []
            querySnapshot.forEach(async (post) => {
                let d = post.data()
                console.log(d)

                const docRef = await doc(db, "media", d.media);
                const mediaQuery = await getDoc(docRef);
                // console.log(docRef)

                let curImg = await getDownloadURL(ref(projectStorage, mediaQuery.data().img))
                let curAudio = await getDownloadURL(ref(projectStorage, mediaQuery.data().audio))

                newData.push({ ...d, img: curImg, audio: curAudio })

            });
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            await sleep(2000)
            setIsLoadded(true)
            return newData
        }
        func()
        .then((res)=>{
            console.log("best", res);
            setData(res)
        })

    }, [])
    // const getData = async () => {
    console.log(data)
    // }
    // getData()
    // console.log(data)
    // const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    // });


    // let data = [
    //     {
    //         img: Img1,
    //         audio: Audio1,
    //         user: 'user1',
    //         prompt: 'An annoying alarm ringing for 30 minutes with mosquitos flying nearby',
    //         caption: 'An annoying clock',
    //         likes: 10,
    //         views: 10,
    //         comments: [{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
    //         commentsLen: 3
    //     },
    //     {
    //         img: Img2,
    //         audio: Audio2,
    //         user: 'user2',
    //         prompt: 'Birthday in 2050',
    //         caption: 'A birthday party',
    //         likes: 10,
    //         views: 10,
    //         comments: [{'user':'user1','text':'That\'s lit!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
    //         commentsLen: 3
    //     },
    //     {
    //         img: Img3,
    //         audio: Audio3,
    //         user: 'user3',
    //         prompt: 'fantasy land, huge stone castles, covered in clouds, surrounded by mountains, rainy weather, steam punk',
    //         caption: 'A castle',
    //         likes: 10,
    //         views: 10,
    //         comments: [{'user':'user1','text':'That\'s lit!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
    //         commentsLen: 3
    //     },
    //     {
    //         img: Img4,
    //         audio: Audio4,
    //         user: 'user4',
    //         prompt: 'A magical town with tall crooked buildings, deformed tall buildings, slanted tall buildings, inspired by amsterdam and victorian england, night time, digital painting, highly detailed, concept art, game art, matte painting, trending on artstation, octane render, 8 k, unreal engine',
    //         caption: 'A city',
    //         likes: 10,
    //         views: 10,
    //         comments: [{'user':'user1','text':'That\'s lit!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
    //         commentsLen: 3
    //     },
    //     {
    //         img: Img5,
    //         audio: Audio5,
    //         user: 'user5',
    //         prompt: 'Old expensive organ playing itself in a Ancient Satan Church',
    //         caption: 'An organ',
    //         likes: 10,
    //         views: 10,
    //         comments: [{'user':'user1','text':'That\'s lit!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
    //         commentsLen: 3
    //     },
    //     {
    //         img: Img6,
    //         audio: Audio6,
    //         user: 'user6',
    //         prompt: 'Dark wolf mage, spell, fog, potion, magic the gathering artwork, d&d, fantasy, cinematic lighting, centered, symmetrical, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, volumetric lighting, epic composition, 8k, art by akihiko yoshida and greg rutkowski and craig mullins, oil painting, cgsociety',
    //         caption: 'A wolf',
    //         likes: 10,
    //         views: 10,
    //         comments: [{'user':'user1','text':'That\'s lit!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
    //         commentsLen: 3
    //     }
    // ]

    const [modal, setModal] = useState(false)
    const [itemModal, setItemModal] = useState({
        img: '',
        audio: '',
        user: '',
        prompt: '',
        caption: '',
        likes: 0,
        views: 0,
        comments: [],
        commentsLen: 0
    })
    const [like, setLike] = useState(false)
    const [isPlay, setIsPlay] = useState(false)


    const getImg = (item) => {
        setItemModal(item)
        setModal(true)
    }
    const renderImg = () => {

        console.log(data)
        return (
            <div className='gallery'>
                {data.map((item, index) => {
                    return (
                        <div className='thumbnail' key={index} onClick={() => getImg(item)}>
                            <img src={item.img} style={{ width: '100%' }} />
                        </div>
                    )
                })}
            </div>
        )
    }
    const renderLoading = () => {
        return (
            <div className='row justify-content-center'>
                {/* <div className='col-sm-5'>

                </div> */}
                <div className='col-sm-11 justify-content-center'>
                    <AiOutlineLoading3Quarters style={{color: 'white',left:'45%',position:'relative'}} size={100}/>
                </div>
                
            </div>
        )
    }

    return (
        <div>

            <div className={modal ? 'modal open' : 'modal'}>
                <CloseIcon className='exit' onClick={() => { setModal(false); setIsPlay(false) }} />




                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-2'>

                        </div>
                        <div className='col-sm-5 text-center'>
                            <h2 style={{ position: 'absolute', width: '50%', top: '15%', left: '13%', textAlign: 'center' }}>{itemModal.caption}</h2>
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
                            <div className='row'>
                                <div className={isPlay ? 'modal open box' : ''}>

                                </div>

                                <img src={itemModal.img} />

                            </div>


                            <div className='row'>
                                {modal ? <ReactAudioPlayer style={{ position: 'absolute', width: '25%', bottom: '10%', left: '25.5%' }} src={itemModal.audio} autoplay controls onPlay={() => setIsPlay(true)} onPause={() => setIsPlay(false)} /> : <div></div>}
                            </div>

                        </div>






                        <div className='col-sm-5 justify-content-center'>


                            <div className='row top-buffer text-center'>
                                <h5>{itemModal.prompt}</h5>

                            </div>

                            <div className='row top-buffer text-center'>
                                <div className='col-sm-4 justify-content-end'>
                                    {like ? (<FcLike size={50} onClick={() => setLike(false)} />) : (<TfiHeart style={{ color: 'white' }} size={50} onClick={() => setLike(true)} />)}
                                </div>
                                <div className='col-sm-4 justify-content-center'>
                                    <AiFillEye style={{ fill: 'white' }} size={50} />
                                </div>
                                <div className='col-sm-4 justify-content-start'>
                                    <AiOutlineComment style={{ fill: 'white' }} size={50} />
                                </div>
                            </div>

                            <div className='row top-buffer text-center'>
                                <div className='col-sm-4 justify-content-end'>
                                    {like ? (<h5>{`${parseInt(itemModal.like) + 1} Likes`}</h5>) : <h5>{`${itemModal.like} Likes`}</h5>}

                                </div>
                                <div className='col-sm-4 justify-content-center'>
                                    <h5>{`${itemModal.views} Views`}</h5>
                                </div>
                                <div className='col-sm-4 justify-content-start'>
                                    <h5>{`${itemModal.commentsLen} comments`}</h5>
                                </div>
                            </div>

                            <div className='row top-buffer' style={{ height: '33%', overflowY: 'scroll' }}>
                                {itemModal.comments.map((item, index) => {
                                    return (
                                        <div className='row'>
                                            <h5>{`${item.user}: ${item.text}`}</h5>
                                        </div>
                                    )
                                })}
                            </div>




                        </div>

                    </div>

                </div>


            </div>
            { isLoaded ?
                renderImg()
                :
                renderLoading()

            }

        </div>

    )
}

export default Gallery