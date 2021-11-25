import React, {useContext} from "react";
import { ThemeContext } from 'styled-components/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeMap, OthersList, OthersDiary} from "../screens";
import {Image} from "react-native";
import {images} from "../images";
import {getHeight, getWidth} from "../hooks/caculateSize";

const Stack = createNativeStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);

    return(
        <Stack.Navigator
        initialRouteName="HomeMap"
        screenOptions={{
            headerBackTitleVisible: false,
                headerBackImage: () => {
                    return (
                        <Image source={images.back} style={{height: getHeight(20), width: getWidth(20)}}/>
                    );
                },
            }}>
            <Stack.Screen name="HomeMap" component={HomeMap} options={{headerShown: false}}/>
            <Stack.Screen name="OthersList" component={OthersList} options={{headerShown: false}}/>
            <Stack.Screen name="OthersDiary" component={OthersDiary} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default MainStack; 