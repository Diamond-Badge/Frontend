import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeMap, Diary, Calendar, Mypage } from '../screens'
import { theme } from '../theme';
import {getHeight, getWidth, getFontSize} from "../hooks/caculateSize"
import DiaryStack from './DiaryStack';
import MainStack from './MainStack';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    const IconHeight = getHeight(44);
    const IconWidth = getWidth(44);
    const LabelSize = Math.round(getFontSize(20));
    
    return(
            <Tab.Navigator
                initialRouteName="지도"
                screenOptions={{
                    keyboardHidesTabBar: true,
                    tabBarActiveTintColor: theme.bottomtabtint,
                    headerShown: false,
                    tabBarStyle:{height: getHeight(90),},
                    tabBarLabelStyle: ({focused}) => {
                        return <Text style={{
                            color: focused? theme.focusedIconLabel : theme.blackText, 
                            }} />
                    }
                }}
                
            >
                <Tab.Screen 
                    name="지도" 
                    component={MainStack}
                    options={{
                        tabBarLabelStyle: {fontSize: LabelSize, fontFamily: "나눔손글씨 중학생", 
                        position: "relative", bottom: getHeight(10)},
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/tab/homemap_active.png"):
                                    require("../assets/icons/tab/homemap.png")} 
                                    style={{width: IconWidth, height: IconHeight}}/> 
                            )},
                            unmountOnBlur: true,
                    }}
                />
                <Tab.Screen 
                    name="일기" 
                    component={DiaryStack}
                    options={{
                        tabBarLabelStyle: {fontSize: LabelSize, fontFamily: "나눔손글씨 중학생", 
                        position: "relative", bottom: getHeight(10)},
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/tab/diary_active.png"):
                                    require("../assets/icons/tab/diary.png")}  
                                    style={{width: IconWidth, height: IconHeight}}/> 
                            )}
                    }}
                />
                <Tab.Screen 
                    name="달력" 
                    component={Calendar}
                    options={{
                        tabBarLabelStyle: {fontSize: LabelSize, fontFamily: "나눔손글씨 중학생", 
                        position: "relative", bottom: getHeight(10)},
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/tab/calendar_active.png"):
                                    require("../assets/icons/tab/calendar.png")}  
                                    style={{width: IconWidth, height: IconHeight}}/> 
                            )}
                    }}
                />
                <Tab.Screen 
                    name="마이페이지" 
                    component={Mypage}
                    options={{
                        tabBarLabelStyle: {fontSize: LabelSize, fontFamily: "나눔손글씨 중학생", 
                        position: "relative", bottom: getHeight(10)},
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/tab/mypage_active.png"):
                                    require("../assets/icons/tab/mypage.png")}  
                                    style={{width: IconWidth, height: IconHeight}}/> 
                            )}
                    }}
                />
            </Tab.Navigator>
    );
  
};

export default MainTab;