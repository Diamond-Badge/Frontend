import React, {useContext} from "react";
import { ThemeContext } from 'styled-components/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Login, NickName} from "../screens";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const theme = useContext(ThemeContext);

    return(
        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            contentStyle: { backgroundColor: theme.whiteBackground },
            headerStyle: { elevation: 0 },
        }}
        >
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="NickName" component={NickName} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default AuthStack;