import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Modal, Button } from 'react-native';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, MapType} from "react-native-nmap";
import {getFontSize, getHeight, getWidth} from "../hooks/caculateSize";
import {images} from "../images";
import styled, {ThemeContext} from "styled-components/native";
import Geolocation from "@react-native-community/geolocation";
import {ProgressContext, BasicContext, UrlContext} from "../contexts"



const CountText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: 25px;
    font-style: normal;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const HomeMap = ({navigation, route}) => {
    const theme = useContext(ThemeContext);
    const {location, setLocation} = useContext(BasicContext);
    const nowCoords = {latitude: location.latitude, longitude: location.longitude};
    const [isModal, setIsModal] = useState(false);
    var isSubscribed = false;

    // 현위치 구하기 
    const geoLocation = () => {
        Geolocation.getCurrentPosition(
          position => {
              const latitude = parseFloat(JSON.stringify(position.coords.latitude));
              const longitude = parseFloat(JSON.stringify(position.coords.longitude));
              let loc = {
                latitude: latitude,
                longitude: longitude,
              };
              
              setLocation(loc);
          },
          error => { console.log(error.code, error.message); },
          {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
      )
    };

    // 마커 클릭시 타인 일기 목록으로 이동 
    const _onPress = () => {
        navigation.navigate("OthersList",{headerTitle: ""});
    };

    // cleanup 함수 구현 
    useEffect(() => {
        isSubscribed = true;
        console.log("mount");
        return(() => {
            isSubscribed = false;
            console.log("unmount");
        });
    }, []);
   
   
   

   // 마커 아이콘 
    const DiadyMarker = React.memo(({coord, count}) => {
        return(
            <Marker coordinate={coord} width={getWidth(83.7)} height={getHeight(97.8)} onClick={_onPress}>
            <View style={{width: "100%", height: "100%"}}>
                <Image source={images.mapMarker} style={{position: "absolute", bottom: 0, left: 0, width: getWidth(72), height: getHeight(84.8)}} resizeMode="contain"/>
                <View style={{position: "absolute", top: 0, right: 0, width: getWidth(35), height: getHeight(35), backgroundColor: theme.characterYellow, borderRadius: 50, justifyContent: "center", alignItems: "center"}}>
                    <CountText>{count}</CountText>
                </View>
            </View>
        </Marker>
        );
    });

    // 임시 마커 데이터들
    const markers = [
        {
            location: {
                latitude:  location.latitude+0.001,  
                longitude: location.longitude-0.004 
            },
            count: 32,
        },
        {
            location: {
                latitude: location.latitude-0.0047, 
                longitude: location.longitude+0.0015
            },
            count: 5,
        },
        {
            location: {
                latitude: location.latitude-0.004,  
                longitude: location.longitude-0.003  
            },
            count: 15,
        },
    ];
    
    

    return (
    <View>
    {/* 지도 */}
    <NaverMapView style={{width: '100%', height: '100%'}} center={nowCoords}
        showsMyLocationButton={false} nightMode={true} mapType={MapType.Navi}>
        {markers.map(item => <DiadyMarker coord={item.location} count={item.count} key={item.count}/>)}
        <Marker coordinate={nowCoords} zIndex={1} width={getWidth(48.2)} height={getHeight(39)} onClick={() => setIsModal(true)}>
            <Image source={images.currentMarker} resizeMode="contain"/>
        </Marker>

    </NaverMapView>

        {/* 현위치 새로고침 버튼 */}
        <TouchableOpacity onPress={() => {
            if(isSubscribed){
                geoLocation();
                setTimeout(() => {
                    navigation.reset({index: 0, routes: [{name: "HomeMap"}]})
                }, 500);
            }
            }} 
            style={{width: getWidth(43), height: getHeight(43), position: "absolute", bottom: getHeight(15), left: getWidth(305)}}><Image source={images.gps} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
        
        {/* 위치 등록 모달 */}
        {isModal? (
            <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: theme.whiteBackground, opacity: 0.3}}>
                    <Modal visible={isModal} transparent={true}>
                            <View style={{position: "absolute", top: getHeight(260), left: getWidth(40), width: getWidth(280), height: getHeight(120), borderRadius: 12, backgroundColor: theme.whiteBackground, borderStyle: "solid",
                    borderColor: theme.edgePink, borderWidth: 4, alignItems: "center", paddingTop: getHeight(13)}}>
                                <CountText> 현재 위치를 등록하시겠습니까?</CountText>
                                <CountText>현재 위치는 OOOO 입니다.</CountText>
                                <TouchableOpacity onPress={() => setIsModal(pre => !pre)} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), left: getWidth(40)}}><Image source={images.cancelButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setIsModal(pre => !pre);
                                    alert(JSON.stringify(nowCoords));
                                    }} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), right: getWidth(40)}}><Image source={images.okButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                            </View>
                    </Modal>
            </View>)
        : null}

    </View>);

    
};


export default React.memo(HomeMap);

