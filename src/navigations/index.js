import React,{useContext, useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import MainTab from './MainTab';
import AuthStack from "./AuthStack";

const Navigation = () => {
    return (
        <>
        <NavigationContainer>
            <MainTab/>
            {/* <AuthStack /> */}
        </NavigationContainer>
        </>
    );
};

export default Navigation;