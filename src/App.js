import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from './theme';
import Navigation from './navigations';
import {ProgressProvider} from "./contexts";
import {ThemeProvider} from "styled-components/native";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <ProgressProvider>
                <Navigation />
            </ProgressProvider>
        </ThemeProvider>
    );
};



export default App;