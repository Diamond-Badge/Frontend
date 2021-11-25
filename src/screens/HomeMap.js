import React, {useContext} from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, MapType} from "react-native-nmap";
import {getFontSize, getHeight, getWidth} from "../hooks/caculateSize";
import {images} from "../images";
import styled, {ThemeContext} from "styled-components/native";

const CountText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: 25px;
    font-style: normal;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const HomeMap = () => {
    const theme = useContext(ThemeContext);
    const P0 = {latitude: 37.572062, longitude: 126.974011};
    const P1 = {latitude: 37.567051, longitude: 126.984567};
    const P2 = {latitude: 37.558383, longitude: 126.976292};
    const mine = {latitude: 37.565383, longitude: 126.978092};

    return (
    <NaverMapView style={{width: '100%', height: '100%'}}
    onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        showsMyLocationButton={true} nightMode={true} mapType={MapType.Navi}>
        <Marker coordinate={P0} width={getWidth(83.7)} height={getHeight(97.8)}>
            <View style={{width: "100%", height: "100%"}}>
                <Image source={images.mapMarker} style={{position: "absolute", bottom: 0, left: 0, width: getWidth(72), height: getHeight(84.8)}} resizeMode="contain"/>
                <View style={{position: "absolute", top: 0, right: 0, width: getWidth(35), height: getHeight(35), backgroundColor: theme.characterYellow, borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <CountText>32</CountText>
                </View>
            </View>
        </Marker>
        <Marker coordinate={P1} width={getWidth(83.7)} height={getHeight(97.8)}>
            <View style={{width: "100%", height: "100%"}}>
                <Image source={images.mapMarker} style={{position: "absolute", bottom: 0, left: 0, width: getWidth(72), height: getHeight(84.8)}} resizeMode="contain"/>
                <View style={{position: "absolute", top: 0, right: 0, width: getWidth(35), height: getHeight(35), backgroundColor: theme.characterYellow, borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <CountText>14</CountText>
                </View>
            </View>
        </Marker>
        <Marker coordinate={P2} width={getWidth(83.7)} height={getHeight(97.8)}>
            <View style={{width: "100%", height: "100%"}}>
                <Image source={images.mapMarker} style={{position: "absolute", bottom: 0, left: 0, width: getWidth(72), height: getHeight(84.8)}} resizeMode="contain"/>
                <View style={{position: "absolute", top: 0, right: 0, width: getWidth(35), height: getHeight(35), backgroundColor: theme.characterYellow, borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <CountText>22</CountText>
                </View>
            </View>
        </Marker>

        <Marker coordinate={mine} width={getWidth(48.2)} height={getHeight(39)}>
            <Image source={images.currentMarker} resizeMode="contain"/>
        </Marker>
        
    </NaverMapView>)
    ;
};


export default HomeMap;