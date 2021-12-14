import React, {createContext, useState, useEffect} from 'react';


const BasicContext = createContext({
    loginSuccess: "id",
    setLoginSuccess: () => {},
    provider: "",
    setProvier: () => {},
    userInfo: {},
    setUserInfo: () => {},
    nickName: "",
    setNickName: () => {},
    isPublic: false,
    setIsPublic: () => {},
    jwt: "",
    setJwt: () => {},
});

const BasicProvider = ({children}) => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [provider, setProvier] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [nickName, setNickName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [jwt, setJwt] = useState("");

    const value = {
        loginSuccess, 
        setLoginSuccess,
        provider,
        setProvier,
        userInfo,
        setUserInfo,
        nickName, 
        setNickName,
        isPublic,
        setIsPublic,
        jwt,
        setJwt,
    };

    // useEffect(()=> {
    //     console.log(value);
    // },[value]);

    return <BasicContext.Provider value={value}>
        {children}
    </BasicContext.Provider>
};

const BasicConsumer = BasicContext.Consumer;

export {BasicConsumer, BasicProvider, BasicContext}; 