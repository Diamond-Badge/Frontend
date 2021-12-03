import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Dimensions, Image, ScrollView} from 'react-native';
import styled from "styled-components/native";
import {getFontSize, getWidth, getHeight} from "../hooks/caculateSize";
import { ImageButton, MonthCalendar, WeekCalendar } from '../components';
import { images } from '../images';
import moment from 'moment';

const HEIGHT = Dimensions.get("screen").height;

const TitleText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(30)}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: center;
    color: ${({theme}) => theme.blackText};
`;  


const Calendar = () => {

    // 지도로 보기
    const _handleMapPress = () => {};

    return (
        <ScrollView>
            <ImageBackground source={require("../assets/images/background.png")} style={{ height: HEIGHT*1.05}}>
                <View style={styles.title}>
                    <TitleText>CALENDAR</TitleText>
                </View>
                <ImageButton 
                    containerStyle={styles.mapicon} imgStyle={styles.mapimage}
                    onPress={_handleMapPress}
                    src={require('../assets/images/mapversion.png')} />
                <MonthCalendar/>
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
    calendar: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    drawing: {
        width: '100%',
        resizeMode: 'stretch'
    },
    row: {
        flexDirection:'row'
    },

});


export default Calendar; 