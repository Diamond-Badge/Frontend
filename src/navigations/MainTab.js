import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeMap, Diary, Calendar, Mypage } from '../screens'

const Tab = createBottomTabNavigator();

const MainTab = () => {
    
    return(
            <Tab.Navigator
                initialRouteName="지도"
                screenOptions={{
                    keyboardHidesTabBar: true,
                }}
            >
                <Tab.Screen 
                    name="지도" 
                    component={HomeMap}
                />
                <Tab.Screen 
                    name="일기" 
                    component={Diary}
                />
                <Tab.Screen 
                    name="달력" 
                    component={Calendar}
                />
                <Tab.Screen 
                    name="마이페이지" 
                    component={Mypage}
                />
            </Tab.Navigator>
    );
  
};

export default MainTab;