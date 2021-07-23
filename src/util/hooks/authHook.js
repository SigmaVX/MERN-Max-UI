import {useEffect, useCallback, useState} from "react";

let logoutTimer;

export const useAuth = () =>{
    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((uid, token, expirationDate)=>{
        setToken(token);
        setUserId(uid);
        const tokenExpiration = expirationDate || new Date(new Date().getTime() + (1000 * 60 * 60));
        setTokenExpirationDate(tokenExpiration);
        localStorage.setItem(
        "userData",
        JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpiration.toISOString()
        }));
    },[]);

    const logout = useCallback(()=>{
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem("userData");
    },[]);

    useEffect(()=>{
        let localData = JSON.parse(localStorage.getItem("userData"));
        if(localData && localData.token && new Date(localData.expiration) > new Date()){
            login(localData.userId, localData.token, new Date(localData.expiration));
        };
    },[login]);

    useEffect(()=>{
        if(token && tokenExpirationDate){
          let remainingTime = new Date(tokenExpirationDate).getTime() - new Date().getTime();
          console.log(remainingTime)
          logoutTimer = setTimeout(logout, remainingTime);
        }else{
          clearTimeout(logoutTimer);
        };
    }, [token, logout, tokenExpirationDate]);

    return {token, login, logout, userId};

};