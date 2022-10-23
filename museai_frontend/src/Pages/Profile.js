import Gallery from '../components/Gallery'
import UploadForm from '../components/UploadForm';
import Title from '../components/Title';
import Navbar from '../components/Navbar';
import {useParams} from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const Profile = () => {
    const {username} = useParams()

    const userInfo = (username) => {
        // FIND USER PROFILE USING USERNAME/USERID
        return {'username':'user1', 'likes':100, 'views': 200, 'follows': 150, 'posts': [{
            img: Img1,
            audio: Audio1,
            user: 'user1',
            prompt: 'An annoying alarm ringing for 30 minutes with mosquitos flying nearby',
            caption: 'An annoying clock',
            likes: 10,
            views: 10,
            comments: [{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
            commentsLen: 3
        },
        {
            img: Img2,
            audio: Audio2,
            user: 'user2',
            prompt: 'Birthday in 2050',
            caption: 'A birthday party',
            likes: 10,
            views: 10,
            comments: [{'user':'user1','text':'That\'s lit!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
            commentsLen: 3
        },
        {
            img: Img3,
            audio: Audio3,
            user: 'user3',
            prompt: 'fantasy land, huge stone castles, covered in clouds, surrounded by mountains, rainy weather, steam punk',
            caption: 'A castle',
            likes: 10,
            views: 10,
            comments: [{'user':'user1','text':'That\'s lit!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'},{'user':'user1','text':'That\'s good!'},{'user':'user2','text':'Amazing'},{'user':'user3','text':'So bad! Boo'}],
            commentsLen: 3
        },]}
    }

    return (
        <div>
            <Navbar/>
            <div className='container'>

                <Title />
                {/* <></> */}
                <Gallery d={userInfo.posts}/>
            </div>
        </div>
        
    )
}
export default Profile