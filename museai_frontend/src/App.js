import logo from './logo.svg';
import './App.css';


import Gallery from './components/Gallery'
import UploadForm from './components/UploadForm';
import Title from './components/Title';
import "./style/style.css"
import Navbar from './components/Navbar';


function App() {
  return (
    <div className='primary_bg'>
      <Navbar />

      <div className='container'>
        <Title />
        <UploadForm />
        <Gallery />
      </div>
    </div>

  );
}

export default App;
