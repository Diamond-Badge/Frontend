import React, {useState} from 'react';
import {ScrollView, StyleSheet, Modal, View, Image, ImageBackground, Dimensions, TouchableOpacity} from 'react-native';
import { PinkButton, ImageButton } from '../components';
import { theme } from '../theme';
import styled from "styled-components/native";
import {getFontSize, getWidth, getHeight} from "../hooks/caculateSize";
import { images } from '../images';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
exports.moment = moment;


const TitleText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${({size}) => getFontSize(size)}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: center;
    color: ${({theme}) => theme.blackText};
`;  

const TextView = styled.View`
    position: absolute;
    top: ${getHeight(422)}px;
    left: ${getWidth(88)}px;
    right: ${getWidth(81)}px;
    justify-content: center;
    align-items: center;
`;

const ModalView = styled.View`
    position: absolute;
    top: ${getHeight(266)}px;
    left: ${getWidth(40)}px;
    right: ${getWidth(40)}px;
    width: ${getWidth(280)}px;
    height: ${getHeight(120)}px;
    border-radius: 12px;
    border-width: 4px;
    border-style: solid;
    border-color: ${({theme}) => theme.modalpink};
    background-color: ${({theme}) => theme.whiteBackground};
`;



const DiaryFirst = () => {

    const [isLocation, setIsLocation] = useState(false);
    const [isBack, setIsBack] = useState(false);

    // 위치 등록 팝업
    const [isLocatioModal, setISLocationModal] = useState(false);

    // 현재 위치 등록 모달
    const _handleLocationModal = () => {setISLocationModal(true)};

    // 현재 위치 등록
    const _handleLocationPress = () => {};

    // 지도로 보기
    const _handleMapPress = () => {};

    const [date, setDate] = useState(moment());

    // 전날
    const _prevDate = () => {
        setDate(date.clone().subtract(1, 'd'));
    };

    // 다음날
    const _nextDate = () => {
        setDate(date.clone().add(1, 'd'));
    };

    // 날짜 변환
    const _dateChange = text => {
        if(parseInt(text)<10){
            return parseInt(text)
        }
        else{ return text }
    }

    

    return (
        <ScrollView>
            <ImageBackground source={images.background} style={{ height: HEIGHT}}>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    {isBack &&
                        <ImageButton 
                            containerStyle={{margin:15}}
                            onPress={_handleMapPress}
                            src={require('../assets/images/back.png') } />}
                    <View style={styles.title}>
                        <TitleText size={30}>MY DIARY</TitleText>
                    </View>
                    <ImageButton 
                        containerStyle={styles.mapicon} imgStyle={{height: 29, width: 29,}}
                        onPress={_handleMapPress} src={images.mapversion} />
                        </View>
                <View>
                    <View style={{top: getHeight(80), left: getWidth(61), position:'absolute'}}>
                        <TitleText size={30}>{date.format('YYYY')+'년 '+_dateChange(date.format('MM'))+'월 '+_dateChange(date.format('DD'))+'일'}</TitleText>
                    </View>
                    <TouchableOpacity style={{top: getHeight(89), position:'absolute', left: getWidth(30)}}
                        onPress={_prevDate}>
                        <TitleText size={20}>◀</TitleText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{top: getHeight(89), position:'absolute', left: getWidth(203)}}
                        onPress={_nextDate}>
                        <TitleText size={20}>▶</TitleText>
                    </TouchableOpacity>
                </View>
                <View style={styles.RedCon}>
                    <Image source={require("../assets/images/diary/diaryaddfirst.png")} />
                </View>
                <TextView>
                    <TitleText size={25}>아직 등록한 위치가 없습니다.</TitleText>
                </TextView>
                <View style={styles.pinkbuttonview}>
                    <TouchableOpacity style={styles.pinkbutton} onPress={_handleLocationModal}>
                        <TitleText size={20}>현재 위치 등록하기</TitleText>
                    </TouchableOpacity>
                    <Modal visible={isLocatioModal} transparent={true}>
                        <TouchableOpacity style={styles.background} onPress={() => setISLocationModal(false)} />
                        <ModalView>
                            <View style={{top: getHeight(27), }}>
                            <TitleText size={25}>위치를 등록하시겠습니까?</TitleText></View>
                            <TouchableOpacity style={[styles.button, styles.greybutton]} onPress={()=>{setISLocationModal(false);}}>
                                <TitleText size={20}>CANCEL</TitleText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.pinkbutton2]} onPress={_handleLocationPress}>
                                <TitleText size={20}>OK</TitleText>
                            </TouchableOpacity>
                        </ModalView>
                            
                    </Modal>
                </View>
                    
            </ImageBackground>
        </ScrollView>
        
    )
};

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        top: getHeight(30),
        left: getWidth(135),
        right: getWidth(135),
    },
    mapicon:{
        position: 'absolute',
        top: getHeight(31),
        left: getWidth(311),
        right: getWidth(20),
    },
    LocationView : {
        position: 'absolute',
        top:getHeight(422),
        left:getWidth(88),
        right: getWidth(81),
        justifyContent:'center',
        alignContent:'center'
    },
    RedCon:{
        position: 'absolute',
        top:  getHeight(210),
        left: getWidth(75),
        width: getWidth(209.9),
        height: getHeight(170),
    },
    pinkbuttonview:{
        position: 'absolute',
        top: getHeight(460),
        left: getWidth(120),
        right: getWidth(120),
    },
    pinkbutton:{
        width: getWidth(120),
        height: getHeight(40),
        borderRadius: 7,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor: theme.pinkTheme,
    },
    modal: {
        marginHorizontal: 20,
        borderRadius: 3,
        alignItems: 'center',
        marginTop: '50%',
        backgroundColor: 'white',
    },
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button:{
        width: getWidth(90),
        height: getHeight(30),
        top: getHeight(70),
        borderRadius: 8,
        justifyContent:'center',
        alignContent:'center',
        position: 'absolute',
    },
    pinkbutton2:{
        right: getWidth(40),
        backgroundColor: theme.pinkbutton,
    },
    greybutton:{
        left: getWidth(40),
        backgroundColor: theme.greybutton,
    }

    
});



export default DiaryFirst;