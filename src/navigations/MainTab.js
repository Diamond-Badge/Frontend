import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeMap, Diary, Calendar, Mypage } from '../screens'
import { theme } from '../theme';

const Tab = createBottomTabNavigator();

const MainTab = () => {
    
    return(
            <Tab.Navigator
                initialRouteName="지도"
                screenOptions={{
                    keyboardHidesTabBar: true,
                    tabBarActiveTintColor: theme.bottomtabtint,
                    headerShown: false,
                    tabBarStyle:{height:60,}
                }}
                
            >
                <Tab.Screen 
                    name="지도" 
                    component={HomeMap}
                    options={{
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/homemap_active.png"):
                                    require("../assets/icons/homemap.png")} /> 
                            )}
                    }}
                />
                <Tab.Screen 
                    name="일기" 
                    component={Diary}
                    options={{
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/diary_active.png"):
                                    require("../assets/icons/diary.png")}  />
                            )}
                    }}
                />
                <Tab.Screen 
                    name="달력" 
                    component={Calendar}
                    options={{
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/calendar_active.png"):
                                    require("../assets/icons/calendar.png")}  />
                            )}
                    }}
                />
                <Tab.Screen 
                    name="마이페이지" 
                    component={Mypage}
                    options={{
                        tabBarIcon:({focused}) =>{
                            return(
                                <Image
                                    source ={focused? require("../assets/icons/mypage_active.png"):
                                    require("../assets/icons/mypage.png")}  />
                            )}
                    }}
                />
            </Tab.Navigator>
    );
  
};

export default MainTab;