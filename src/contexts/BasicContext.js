import React, {createContext, useState, useEffect} from 'react';


const BasicContext = createContext({
    loginSuccess: "id",
    setLoginSuccess: () => {},
    provider: "",
    setProvier: () => {},
    userInfo:  {
        profileImage: null,
        email: null,
    },
    setUserInfo: () => {},
    nickName: "",
    setNickName: () => {},
    isPublic: false,
    setIsPublic: () => {},
    jwt: "",
    setJwt: () => {},
    location: {
        latitude: 0,
        longitude: 0,
    },
    setLocation: () => {}
});

const BasicProvider = ({children}) => {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [provider, setProvier] = useState("");
    const [userInfo, setUserInfo] = useState({
        profileImage: null,
        email: null,
      });
    const [nickName, setNickName] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [jwt, setJwt] = useState("");
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

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
        location,
        setLocation,
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