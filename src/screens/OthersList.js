import React from 'react';
import {StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity} from 'react-native';
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
    top: 0;
    left: 0;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const RemainText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(20)}px;
    font-style: normal;
    position: absolute;
    top: 0;
    right: ${getWidth(8)};
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const LikeText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(15)}px;
    font-style: normal;
    position: absolute;
    bottom: ${getHeight(8.5)};
    right: ${getWidth(15)};
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;


const OthersList = ({ navigation: { goBack, navigate } }) => {
    
    const _onPress =() => {
        navigate("OthersDiary");
    };
    
    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}}>
               <DayText>2021년 11월 20일</DayText>
               <TouchableOpacity onPress={() => goBack()}><Image source={images.back} style={{position: "absolute", top: getHeight(40), left: getWidth(20) ,height: getHeight(20), width: getWidth(20)}}/></TouchableOpacity>
               <ScrollView style={{marginTop: getHeight(110), paddingRight: getWidth(30)}}>
                   <TouchableOpacity onPress={_onPress} style={{left: getWidth(30), marginBottom: getHeight(14), width: getWidth(300), height: getHeight(110)}}>
                        <NicknameText>닉네임</NicknameText>
                        <RemainText>5분전</RemainText>
                        <Image source={images.otherProfile} style={{position: "absolute", bottom: 0, width: getWidth(90), height: getHeight(90), resizeMode: "contain"}}/>
                        <Image source={images.otherDiary} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(200), height: getHeight(90), resizeMode: "contain"}} />
                        <Image source={images.heart} style={{position: "absolute", bottom: getHeight(8.5), right: getWidth(27), width: getWidth(13), height: getHeight(11.5), resizeMode: "contain"}}/>
                        <LikeText>23</LikeText>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={_onPress} style={{left: getWidth(30), marginBottom: getHeight(14), width: getWidth(300), height: getHeight(110)}}>
                        <NicknameText>닉네임</NicknameText>
                        <RemainText>5분전</RemainText>
                        <Image source={images.otherProfile} style={{position: "absolute", bottom: 0, width: getWidth(90), height: getHeight(90), resizeMode: "contain"}}/>
                        <Image source={images.otherDiary} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(200), height: getHeight(90), resizeMode: "contain"}} />
                        <Image source={images.heart} style={{position: "absolute", bottom: getHeight(8.5), right: getWidth(27), width: getWidth(13), height: getHeight(11.5), resizeMode: "contain"}}/>
                        <LikeText>41</LikeText>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={_onPress} style={{left: getWidth(30), marginBottom: getHeight(14), width: getWidth(300), height: getHeight(110)}}>
                        <NicknameText>닉네임</NicknameText>
                        <RemainText>5분전</RemainText>
                        <Image source={images.otherProfile} style={{position: "absolute", bottom: 0, width: getWidth(90), height: getHeight(90), resizeMode: "contain"}}/>
                        <Image source={images.otherDiary} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(200), height: getHeight(90), resizeMode: "contain"}} />
                        <Image source={images.heart} style={{position: "absolute", bottom: getHeight(8.5), right: getWidth(27), width: getWidth(13), height: getHeight(11.5), resizeMode: "contain"}}/>
                        <LikeText>13</LikeText>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={_onPress} style={{left: getWidth(30), marginBottom: getHeight(14), width: getWidth(300), height: getHeight(110)}}>
                        <NicknameText>닉네임</NicknameText>
                        <RemainText>5분전</RemainText>
                        <Image source={images.otherProfile} style={{position: "absolute", bottom: 0, width: getWidth(90), height: getHeight(90), resizeMode: "contain"}}/>
                        <Image source={images.otherDiary} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(200), height: getHeight(90), resizeMode: "contain"}} />
                        <Image source={images.heart} style={{position: "absolute", bottom: getHeight(8.5), right: getWidth(27), width: getWidth(13), height: getHeight(11.5), resizeMode: "contain"}}/>
                        <LikeText>21</LikeText>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={_onPress} style={{left: getWidth(30), marginBottom: getHeight(14), width: getWidth(300), height: getHeight(110)}}>
                        <NicknameText>닉네임</NicknameText>
                        <RemainText>5분전</RemainText>
                        <Image source={images.otherProfile} style={{position: "absolute", bottom: 0, width: getWidth(90), height: getHeight(90), resizeMode: "contain"}}/>
                        <Image source={images.otherDiary} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(200), height: getHeight(90), resizeMode: "contain"}} />
                        <Image source={images.heart} style={{position: "absolute", bottom: getHeight(8.5), right: getWidth(27), width: getWidth(13), height: getHeight(11.5), resizeMode: "contain"}}/>
                        <LikeText>23</LikeText>
                   </TouchableOpacity>

                   <TouchableOpacity onPress={_onPress} style={{left: getWidth(30), marginBottom: getHeight(14), width: getWidth(300), height: getHeight(110)}}>
                        <NicknameText>닉네임</NicknameText>
                        <RemainText>5분전</RemainText>
                        <Image source={images.otherProfile} style={{position: "absolute", bottom: 0, width: getWidth(90), height: getHeight(90), resizeMode: "contain"}}/>
                        <Image source={images.otherDiary} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(200), height: getHeight(90), resizeMode: "contain"}} />
                        <Image source={images.heart} style={{position: "absolute", bottom: getHeight(8.5), right: getWidth(27), width: getWidth(13), height: getHeight(11.5), resizeMode: "contain"}}/>
                        <LikeText>23</LikeText>
                   </TouchableOpacity>
                   
               </ScrollView>
        </ImageBackground>
    );
};



export default OthersList;