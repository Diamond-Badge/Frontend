import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions, Modal, ScrollView, TouchableOpacity} from 'react-native';
import styled from "styled-components/native";
import {getFontSize, getWidth, getHeight} from "../hooks/caculateSize";
import { ImageButton, MonthCalendar, WeekCalendar } from '../components';
import { theme } from '../theme';


const HEIGHT = Dimensions.get("screen").height;

const TitleText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${({size}) => getFontSize(size)}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: ${({align}) => align ? align : 'center'};
    color: ${({theme}) => theme.blackText};
`;  


const Calendar = () => {

    // 월<>주
    const [isChangeModal, setIsChangeModal] = useState(false);
    const [text, setText] = useState("월");

    // 월<>주 모달
    const _handleChangeModal = () => {setIsChangeModal(true)};

    // 지도로 보기
    const _handleMapPress = () => {};

    // 월 <> 주 변경
    const generate = () => {
        if(text =="월"){
            return <MonthCalendar/>
        }
        else if(text=="주"){
            return <WeekCalendar/>
        }
    }

    return (
        <ScrollView>
            <ImageBackground source={require("../assets/images/background.png")} style={{ height: HEIGHT*1.05}}>
                <View style={styles.title}>
                    <TitleText size={30} >CALENDAR</TitleText>
                </View>
                {generate()}
                <TouchableOpacity style={[styles.calselect,styles.selectborder]} onPress={_handleChangeModal}>
                    <TitleText size={20} align={'left'} style={{left: getWidth(14), top: getHeight(2)}}>{text}</TitleText>
                </TouchableOpacity>
                <Modal visible={isChangeModal} transparent={true} >
                    <TouchableOpacity style={{position:'absolute', height:'100%', width:'100%'}} onPress={() => setIsChangeModal(false)} />
                    {/* 월 주 선택 */}
                    
                    <View style={[styles.calselects, styles.selectborder]} >
                        <TitleText size={20} align={'left'} style={{left: getWidth(14), top: getHeight(4)}}
                            onPress={() => {setText("주"); setIsChangeModal(false);}}>주</TitleText>
                        <View style={styles.line} />
                        <TitleText size={20} align={'left'} style={{left: getWidth(14), top: getHeight(6)}}
                            onPress={() => {setText("월"); setIsChangeModal(false);}}>월</TitleText>
                    </View>

                </Modal>
                <ImageButton 
                    containerStyle={styles.mapicon} imgStyle={styles.mapimage}
                    onPress={_handleMapPress}
                    src={require('../assets/images/mapversion.png')} />
                
            </ImageBackground>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        top: getHeight(30),
        left: getWidth(135),
        right: getWidth(133),
    },
    mapicon:{
        position: 'absolute',
        top: getHeight(31),
        left: getWidth(311),
        right: getWidth(20),
    },
    mapimage: {
        height: 29,
        width: 29,
    },
    row: {
        flexDirection:'row'
    },
    selectborder:{
        left: getWidth(278),
        position:'absolute',
        backgroundColor: theme.whiteBackground,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#eec5c2",
    },
    calselect:{
        top: getHeight(70),
        width: getWidth(66),
        height: getHeight(30),
        borderRadius: 10,
    },
    calselects: {
        top: getHeight(78),
        width: getWidth(66),
        height: getHeight(57),
        borderRadius: 14,
    },
    line: {
        position:'absolute',
        top: getHeight(90),
        left: getWidth(278),
        width: getWidth(64),
        height: getHeight(6),
        opacity: 0.5,
        backgroundColor: "f6c3c1",
    },
    
});


export default Calendar;