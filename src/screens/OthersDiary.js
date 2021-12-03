import React, {useContext} from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native';
import styled, {ThemeContext} from "styled-components/native";
import {images} from "../images";
import {getFontSize, getHeight, getWidth} from "../hooks/caculateSize";

const DayText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(30)}px;
    font-style: normal;
    position: absolute;
    top: ${getHeight(52)}px;
    left: ${getWidth(125)}px;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const NicknameText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(20)}px;
    font-style: normal;
    position: absolute;
    top: ${getHeight(94)}px;
    left: ${getWidth(40)}px;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const RemainText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(20)}px;
    font-style: normal;
    position: absolute;
    top: ${getHeight(94)}px;
    right: ${getWidth(40)}px;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const LikeText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(15)}px;
    font-style: normal;
    position: absolute;
    top: ${getHeight(593)}px;
    left: ${getWidth(60)}px;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;


const OthersDiary = ({ navigation: { goBack } }) => {
    const theme = useContext(ThemeContext);

    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}}>
            <DayText>2021년 11월 20일</DayText>
            <TouchableOpacity onPress={() => goBack()}><Image source={images.back} style={{position: "absolute", top: getHeight(40), left: getWidth(20) ,height: getHeight(20), width: getWidth(20)}}/></TouchableOpacity>
            <NicknameText>닉네임</NicknameText>
            <RemainText>5분전</RemainText>
            <View style={{
                position: "absolute", top: getHeight(120), left: getWidth(40),
                width: getWidth(280), height: getHeight(210), opacity: 0.38, backgroundColor: theme.DiaryImageBlack}}/>
            <View style={{
                position: "absolute", top: getHeight(363), left: getWidth(40), borderStyle: "solid", borderWidth: 0.8, borderColor: theme.DiaryImageBlack,
                width: getWidth(280), height: getHeight(210), backgroundColor: theme.whiteBackground}}>
                <DayText style={{position: "absolute", top: 2, left: 2}}>글내용</DayText>
            </View>

            <Image source={images.heart} style={{position: "absolute", top: getHeight(593), left: getWidth(40), width: getWidth(16), height: getHeight(14.1), resizeMode: "contain"}} />
            <LikeText>23</LikeText>
            <Image source={images.option} style={{position: "absolute", top: getHeight(40), left: getWidth(322), width: getWidth(20), height: getHeight(20), resizeMode: "contain"}} />
            

        </ImageBackground>
    )
};



export default OthersDiary; 