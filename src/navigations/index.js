import React,{useContext, useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import MainTab from './MainTab';
import AuthStack from "./AuthStack";
import {BasicContext} from "../contexts";

const Navigation = () => {
    const {loginSuccess, setLoginSuccess} = useContext(BasicContext);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if(loginSuccess){
            setIsReady(true);
        }else{
            setIsReady(false);
        }
    },[loginSuccess]);

    return (
        <>
        <NavigationContainer>
             {isReady? <MainTab /> : <AuthStack />}
        </NavigationContainer>
        </>
    );
};

export default Navigation;