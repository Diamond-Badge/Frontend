import React,{useContext} from 'react';
import {ThemeContext} from "styled-components/native";
import { createStackNavigator } from '@react-navigation/stack';
import {Diary, DiaryFirst, DiaryWrite} from "../screens";

const Stack = createStackNavigator();

const DiaryStack = ({navigation, route}) => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator>
            <Stack.Screen name= "Diary" component={Diary} options={{headerShown: false}} />
            <Stack.Screen name= "DiaryFirst" component={DiaryFirst} options={{headerShown: false}}/>
            <Stack.Screen name= "DiaryWrite" component={DiaryWrite} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default DiaryStack;