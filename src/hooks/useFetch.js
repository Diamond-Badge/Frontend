import {useState, useEffect, useContext} from 'react';
import {ProgressContext} from "../contexts";

export const useFetch = (url, options) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const {spinner} = useContext(ProgressContext);
    
    const fetchData = async (url, options) => {
        try{
            spinner.start();
            let res = await fetch(url, options);
            let result = await res.json();
            if(res.ok){
                setData(result);
                setError(null);
            }else{
                throw result;
            }
        }catch (error) {
            setError(error);
        }finally {
            spinner.stop();
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    return { data, error };
};