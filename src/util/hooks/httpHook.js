import {useState, useCallback, useRef, useEffect} from "react";

export const useHttpClient = () =>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const activeHttpRequests = useRef([]);

    useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.forEach((abortController) => abortController.abort());
        };
    }, []);

    const clearError = () =>{
        setError("");
    };

    const sendRequest = useCallback(async (url, method="GET", body=null, headers={}) =>{
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try{
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers,
                signal: httpAbortCtrl.signal
            });
            const resData = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter((abortCtl)=> abortCtl !== httpAbortCtrl);
            if(!response.ok){throw new Error(resData.message);};
            setIsLoading(false);
            return resData;
        }catch(err){
            console.log(err);
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, []);
    return {isLoading, error, sendRequest, clearError};
};