import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const responseData = await response.json();
    if(!response.ok){
        throw new Error(responseData.message || "Failed to fetch Data");
    }
    return responseData;
}

export default function useHttp(url, config, initialValue){

    const [data, setData] = useState(initialValue);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    function clearData(){
        setData(initialValue);        
    }


    const sendRequest = useCallback(
        async function sendRequest(data){
            setIsLoading(true);
            try{
                const resData = await sendHttpRequest(url, {...config, body: data});
                setData(resData);
            } catch(error) {
                setError(error.message || "something went wrong");
            }
            setIsLoading(false);
    }, [url, config]) 

    useEffect(()=>{
        if(config.method != "POST"){
            sendRequest();
        }
    }, [sendRequest])

    return {
        data,
        error,
        isLoading,
        sendRequest,
        clearData,
    };
}