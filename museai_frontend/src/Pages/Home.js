import Gallery from '../components/Gallery'
import UploadForm from '../components/UploadForm';
import Title from '../components/Title';
import Navbar from '../components/Navbar';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
    let data = []
    return (
        <div>
            <Navbar/>
            <div className='container'>
            
                <Title />
                <UploadForm />
                <Gallery/>
            </div>
        </div>
        
    )
}
export default Home