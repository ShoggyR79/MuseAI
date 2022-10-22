import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Gallery from './components/Gallery'
import UploadForm from './components/UploadForm';
import Title from './components/Title';
import "./style/style.css"
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className='primary_bg'>
      
      <BrowserRouter>
      <Routes>

          {/* <Route index element={<Home />} /> */}
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
      
    </div>

  );
}

export default App;
