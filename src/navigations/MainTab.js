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
                                    source ={focused? require("../assets/icons/tab/homemap_active.png"):
                                    require("../assets/icons/tab/homemap.png")} 
                                    style={{width:45, height:45}}/> 
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
                                    source ={focused? require("../assets/icons/tab/diary_active.png"):
                                    require("../assets/icons/tab/diary.png")}  
                                    style={{width:40, height:40}}/>
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
                                    source ={focused? require("../assets/icons/tab/calendar_active.png"):
                                    require("../assets/icons/tab/calendar.png")}  
                                    style={{width:38, height:38}}/>
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
                                    source ={focused? require("../assets/icons/tab/mypage_active.png"):
                                    require("../assets/icons/tab/mypage.png")}  
                                    style={{width:40, height:40}}/>
                            )}
                    }}
                />
            </Tab.Navigator>
    );
  
};

export default MainTab;