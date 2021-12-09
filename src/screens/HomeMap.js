import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button } from 'react-native';
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

const HomeMap = ({navigation}) => {
    const theme = useContext(ThemeContext);
    const P0 = {latitude: 37.572062, longitude: 126.974011};
    const P1 = {latitude: 37.567051, longitude: 126.984567};
    const P2 = {latitude: 37.558383, longitude: 126.976292};
    const mine = {latitude: 37.565383, longitude: 126.978092};
    const [isModal, setIsModal] = useState(false);

    
    const _onPress = () => {
        navigation.navigate("OthersList");
    };
   
    

    return (
    <View>
    <NaverMapView style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true} nightMode={true} mapType={MapType.Navi}>
        <Marker coordinate={P0} width={getWidth(83.7)} height={getHeight(97.8)} onClick={_onPress}>
            <View style={{width: "100%", height: "100%"}}>
                <Image source={images.mapMarker} style={{position: "absolute", bottom: 0, left: 0, width: getWidth(72), height: getHeight(84.8)}} resizeMode="contain"/>
                <View style={{position: "absolute", top: 0, right: 0, width: getWidth(35), height: getHeight(35), backgroundColor: theme.characterYellow, borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <CountText>32</CountText>
                </View>
            </View>
        </Marker>
        <Marker coordinate={P1} width={getWidth(83.7)} height={getHeight(97.8)} onClick={_onPress}>
            <View style={{width: "100%", height: "100%"}}>
                <Image source={images.mapMarker} style={{position: "absolute", bottom: 0, left: 0, width: getWidth(72), height: getHeight(84.8)}} resizeMode="contain"/>
                <View style={{position: "absolute", top: 0, right: 0, width: getWidth(35), height: getHeight(35), backgroundColor: theme.characterYellow, borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <CountText>14</CountText>
                </View>
            </View>
        </Marker>
        <Marker coordinate={P2} width={getWidth(83.7)} height={getHeight(97.8)} onClick={_onPress}>
            <View style={{width: "100%", height: "100%"}}>
                <Image source={images.mapMarker} style={{position: "absolute", bottom: 0, left: 0, width: getWidth(72), height: getHeight(84.8)}} resizeMode="contain"/>
                <View style={{position: "absolute", top: 0, right: 0, width: getWidth(35), height: getHeight(35), backgroundColor: theme.characterYellow, borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <CountText>22</CountText>
                </View>
            </View>
        </Marker>

        <Marker coordinate={mine} width={getWidth(48.2)} height={getHeight(39)} onClick={() => setIsModal(true)}>
            <Image source={images.currentMarker} resizeMode="contain"/>
        </Marker>

    </NaverMapView>

    {isModal? (
           <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: theme.whiteBackground, opacity: 0.3}}>
                <Modal visible={isModal} transparent={true}>
                        <View style={{position: "absolute", top: getHeight(260), left: getWidth(40), width: getWidth(280), height: getHeight(120), borderRadius: 12, backgroundColor: theme.whiteBackground, borderStyle: "solid",
                borderColor: theme.edgePink, borderWidth: 4, alignItems: "center", paddingTop: getHeight(13)}}>
                            <CountText> 현재 위치를 등록하시겠습니까?</CountText>
                            <CountText>현재 위치는 OOOO 입니다.</CountText>
                            <TouchableOpacity onPress={() => setIsModal(pre => !pre)} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), left: getWidth(40)}}><Image source={images.cancelButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModal(pre => !pre)} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), right: getWidth(40)}}><Image source={images.okButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                            
                        </View>
                </Modal>
            </View>)
            : null}

    </View>)
    ;
};


export default HomeMap;