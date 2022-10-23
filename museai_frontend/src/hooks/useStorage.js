import {useState, useEffect} from 'react';
import {projectStorage} from '../firebase/config';

const useStorage = () =>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, seturl] = useState(null);
}