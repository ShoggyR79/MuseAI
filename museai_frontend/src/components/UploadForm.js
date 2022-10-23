
import React, { useState } from 'react'
import react, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import "../style/style.css"
import { Slider } from '@mui/material';
import { FiSettings } from "react-icons/fi"
import { GiSettingsKnobs } from "react-icons/gi"
import { TagPicker } from 'rsuite';
import Select from 'react-select';
import axios from 'axios'
import { projectFirestore } from '../firebase/config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const UploadForm = () => {

    // const firebaseConfig = {
    //     apiKey: "AIzaSyAbQIzCBIKM9UH2xwH-uOYITjZppCAhrbE",
    //     authDomain: "museai-7da19.firebaseapp.com",
    //     projectId: "museai-7da19",
    //     storageBucket: "museai-7da19.appspot.com",
    //     messagingSenderId: "792426663423",
    //     appId: "1:792426663423:web:e2b1dcf08f7c2ef485ebca",
    //     measurementId: "G-4H57BJ3110"
    // };
    // const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);


    const [isSettings, setIsSettings] = useState(false)

    const [height, setHeight] = useState(512)
    const [width, setWidth] = useState(512)
    const [duration, setDuration] = useState(15)
    const [imgTags, setImgTags] = useState([])
    const [musTags, setMusTags] = useState([])
    const [prompt, setPrompt] = useState('')
    const [caption, setCaption] = useState('')

    const musicTags = ['neo-classic', 'funk', 'jazz', 'mystical', 'horror', 'idm', 'holidays', 'pop', 'hiphop', 'urban', 'fantasy', 'chill', 'dance', 'heavy bassline', 'melodic', 'nature', 'joyful', 'sorrow', 'futuristic', 'calm'].map(
        item => ({ label: item, value: item })
    );

    const imageTags = ['bright color', 'oil painting', 'digital painting', 'highly detailed', 'concept art', 'game art', 'matte painting', 'steam punk', 'sharp focus', 'illustration', 'dark', 'soft light', 'fantasy', 'futuristic city', 'utopia', 'gloomy', 'lifeless', 'detailed', 'realistic', 'cyberpunk'].map(
        item => ({ label: item, value: item })
    );

    const { user } = UserAuth()
    const submitHandler = async (event) => {
        event.preventDefault();
        const body = {
            height: height,
            width: width,
            duration: duration,
            prompt: prompt,
            caption: caption,
            imgTags: imgTags.map((tag) => { return tag.value }),
            musicTags: musTags.map((tag) => { return tag.value }),
            userId: user.uid
        }
        console.log(body)
        const res = await axios({
            method: "post",
            url: "http://129.59.9.156:5000/txt2muse",
            data: body
        });

        const data = res.data;
        console.log(data);
        if (data.message == "error") {
            alert("Please keep the prompts friendly")
            window.location.reload(false);
        }
        const postRef = collection(projectFirestore, 'post')
        const post = {
            user: user.displayName,
            uid: user.uid,
            like: 0,
            views: 0,
            prompt,
            caption,
            media: data.id
        }
        addDoc(postRef, post).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })

    }


    // const renderImgUpload = () => {
    //     if (user != null) {
    //         return (<form className="col-5 form ">
    //             <input type="file" onChange={changeHandler} />
    //         </form>)

    //     } else {
    //         return (
    //             <h4 className='col-5 text-danger text-center'>Log in to start generating!</h4>
    //         )
    //     }
    // }
    const renderForm = () => {
        if (user != null) {
            return (<form className="col-5 form ">
                <div className="form-group text-center">
                    <div>
                        <textarea className="form-control mt-3" id="PromptTextArea" rows={5} defaultValue={""} placeholder="Enter a description for the image and/or music you want to be generated" onChange={(event) => setPrompt(event.target.value)} />
                    </div>
                    <div>
                        <textarea className="form-control mt-3" id="CaptionTextArea" rows={2} defaultValue={""} placeholder="Enter a caption for your image" onChange={(event) => setCaption(event.target.value)} />
                    </div>
                    <button type="submit" style={{ textAlign: "center", backgroundColor: "#191C76", color: "E3DFFF" }} class="btn btn-primary btn-lg col-12 mt-3" onClick={submitHandler}>Submit</button>

                    {isSettings ?
                        <FiSettings size={30} style={{ color: 'white', marginTop: '10px', cursor: 'pointer', transition: 'all 350ms ease' }} onClick={() => setIsSettings(!isSettings)} />
                        :
                        <FiSettings size={30} style={{ color: 'white', marginTop: '10px', cursor: 'pointer', transition: 'all 350ms ease', transform: 'rotate(180deg)' }} onClick={() => setIsSettings(!isSettings)} />

                    }

                </div>

            </form>)

        } else {
            return (
                <h4 className='col-5 text-danger text-center'>Log in to start generating!</h4>
            )
        }
    }


    return (
        <div className=" row d-flex justify-content-center mb-5">
            {renderForm()}

            {isSettings ?
                <div style={{ transition: 'all 500ms ease' }}>
                    <div className='row top-buffer' style={{ transition: 'all 500ms ease', transform: 'rotate(360deg)' }}>
                        <div className='col-sm-3'>

                        </div>
                        <div className='col-sm-3 justify-content-center text-center'>
                            <h5 style={{ color: 'white' }}>Height</h5>
                            <Slider defaultValue={512} valueLabelDisplay="auto" step={16} marks min={64} max={1024} size={'small'} onChange={(event) => setHeight(event.target.value)} />
                        </div>

                        <div className='col-sm-3 justify-content-center text-center'>
                            <h5 style={{ color: 'white' }}>Width</h5>
                            <Slider defaultValue={512} valueLabelDisplay="auto" step={16} marks min={64} max={1024} size={'small'} onChange={(event) => setWidth(event.target.value)} />
                        </div>

                    </div>
                    <div className='row' style={{ transition: 'all 500ms ease' }}>
                        <div className='col-sm-3'>

                        </div>
                        <div className='col-sm-3 text-center'>
                            <div className='row'>
                                <h5 style={{ color: 'white' }}>Image Tags</h5>
                            </div>

                            <div className='row'>
                                <Select
                                    // onChange={this.handleChange}
                                    options={imageTags}
                                    isMulti={true}
                                    onChange={(selectedOption) => setImgTags(selectedOption)}
                                />
                            </div>

                        </div>

                        <div className='col-sm-3 text-center'>
                            <div className='row'>
                                <h5 style={{ color: 'white' }}>Music Tags</h5>
                            </div>

                            <div className='row'>
                                <Select
                                    // onChange={this.handleChange}
                                    options={musicTags}
                                    isMulti={true}
                                    onChange={(selectedOption) => setMusTags(selectedOption)}
                                />
                            </div>

                        </div>
                    </div>
                    <div className='row top-buffer' style={{ transition: 'all 500ms ease' }}>
                        <div className='col-sm-3'>

                        </div>
                        <div className='col-sm-6 justify-content-center text-center'>
                            <div classNaME='row'>
                                <h5 style={{ color: 'white' }}>Duration</h5>
                            </div>
                            <div className='row'>
                                <Slider defaultValue={15} valueLabelDisplay="auto" step={5} marks min={5} max={60} size={'small'} onChange={(event) => setDuration(event.target.value)} />
                            </div>

                        </div>
                    </div>
                </div>
                :
                <div></div>
            }

        </div>

    )
}

export default UploadForm;