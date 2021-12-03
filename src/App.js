import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { theme } from './theme';
import Navigation from './navigations';
import {ProgressProvider, BasicProvider} from "./contexts";
import {ThemeProvider} from "styled-components/native";
import SplashScreen from 'react-native-splash-screen';

const App = () => {

    useEffect(() => {
        SplashScreen.hide();
    },[]);

    return (
        <ThemeProvider theme={theme}>
            <BasicProvider>
            <ProgressProvider>
                <StatusBar hidden={true}/>
                <Navigation />
            </ProgressProvider>
            </BasicProvider>
        </ThemeProvider>
    );
};



export default App;