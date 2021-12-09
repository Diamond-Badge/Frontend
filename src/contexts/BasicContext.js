import React, {createContext, useState, useEffect} from 'react';


const BasicContext = createContext({
    loginSuccess: "id",
    setLoginSuccess: () => {},
    provider: "",
    setProvier: () => {},
    token: "",
    setToken: () => {},
    userInfo: {},
    setUserInfo: () => {},
    nickName: "",
    setNickName: () => {},
    isPublic: false,
    setIsPublic: () => {},
});

const BasicProvider = ({children}) => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [provider, setProvier] = useState("");
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [nickName, setNickName] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const value = {
        loginSuccess, 
        setLoginSuccess,
        provider,
        setProvier,
        token,
        setToken,
        userInfo,
        setUserInfo,
        nickName, 
        setNickName,
        isPublic,
        setIsPublic,
    };

    useEffect(()=> {
        console.log(value);
    },[value]);

    return <BasicContext.Provider value={value}>
        {children}
    </BasicContext.Provider>
};

const BasicConsumer = BasicContext.Consumer;

export {BasicConsumer, BasicProvider, BasicContext}; 