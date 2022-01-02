import React, {useState, useContext, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, TextInput, View, Image, ImageBackground, Dimensions, TouchableOpacity} from 'react-native';
import {  ImageButton, DiaryPhotoAdd } from '../components';
import { theme } from '../theme';
import styled from "styled-components/native";
import {getFontSize, getWidth, getHeight} from "../hooks/caculateSize";
import { images } from '../images';
import {ProgressContext, BasicContext, UrlContext} from "../contexts";

var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
exports.moment = moment;


const TitleText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${({size}) => getFontSize(size)}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: ${({align}) => align ? align : 'center'};
    color: ${({theme}) => theme.blackText};
`;  

const StyledImage = styled.Image`
    margin-top: 10px;
    width: ${getWidth(200)}px;
    height: ${getHeight(200)}px;
`;


const DiaryWrite = ({navigation, route}) => {

    const {jwt} = useContext(BasicContext);
    const {spinner} = useContext(ProgressContext);
    const {url} = useContext(UrlContext);
   
    const [date, setDate] = useState(moment());

    const [place, setPlace] = useState("00 대학교");
    const [time, setTime] = useState("11:04 AM");

    const [diarySeq, setDiarySeq] = useState(route.params.diaryId);

    const [id, setId] = useState(0);
    const [photo, setPhoto] = useState();
    const [photos, setPhotos] = useState([]);

    // 일기 내용
    const [content, setContent] = useState('');

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

    // 일기 저장
    const _onSavePress = async () => {
        let fixedUrl = url+`/api/v1/diary/${diarySeq}?content=${content}&place=${place}`;
      
        let formData = new FormData();
        photos.map( item => formData.append("files", {uri: item.uri}));

        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Autorization': jwt,
            },
            body: formData,
        };
        try{
          spinner.start();
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          console.log(res);
          if(res.success){
            navigation.navigate("Diary");
          }else{
            navigation.navigate("Diary");
            return "error";
          }
        }catch(e){
          console.log(e);
        }finally{
          spinner.stop();
        }
    };

    // 사진 4장 받기
    const _photoAdd = () => {
        if(photos.length == 4){
            return <>{photos.map(item => <StyledImage key={item.key} source={{uri : item.uri}} />)}</>;
        }
        else{
            console.log(photos);
            return (
            <View>
            <DiaryPhotoAdd disabled={false}  
                photo={photo}
                onChangeImage={photo => {setPhoto(photo); setPhotos([...photos, {key: id, uri: photo}]); setId(id+1);}}/>
            {photos.map(item => 
                <View>
                    <StyledImage key={item.key} source={{uri : item.uri}}/>
                    <View style={{flexDirection:'row'}}>
                        {/* <ImageButton containerStyle={{top: getHeight(3.3)}} 
                            imgStyle={{width: getWidth(14), height:getHeight(14)}} src={images.diaryedit}
                            onPress={()=>{}} /> */}
                        <ImageButton containerStyle={{top: getHeight(3.3), left: getWidth(185)}} 
                            imgStyle={{width: getWidth(16), height:getHeight(16)}} src={images.diarydelete}
                            onPress={()=>{setPhotos(photos.filter(photo => photo.key !== item.key));}} />
                    </View>
                    
                </View>
            )}
             </View>
            );
        }
    }


    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}} resizeMode="cover">
            <ScrollView>
                {/* 타이틀 바 */}
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <ImageButton 
                        containerStyle={{top: getHeight(40), left: getWidth(20), position: 'absolute'}}
                        onPress={() => navigation.popToTop()}
                        src={require('../assets/images/back.png') } />
                    <View style={styles.title}>
                        <TitleText size={30}>MY DIARY</TitleText>
                    </View>
                    <ImageButton 
                        containerStyle={{top: getHeight(37.2), left: getWidth(314), position: 'absolute', opacity: 1}}
                        onPress={() => _onSavePress()}
                        src={images.check} />
                    </View>

                {/* 날짜 */}
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

                {/* 내용 */}
                <View style={styles.diaryborder}>
                    {/* 세로줄 */}
                    <View style={styles.add}/>
                    <View style={{top: getHeight(34), left: getWidth(53), right: getWidth(233),}}>
                        <Image source={images.diaryicon} style={{width: getWidth(38), height: getHeight(32)}}/>
                    </View>
                    {/* 시간 & 장소 */}
                    <View style={{left: getWidth(11), top: getHeight(8)}}>
                        <TitleText size={16} align={'left'}>{time}</TitleText>
                    </View>
                    <View style={{left: getWidth(98), bottom: getHeight(14) }}>
                        <TitleText size={25} align={'left'}>{place}</TitleText>
                    </View>
                    {/* 사진 추가 */}
                    <View style={{ marginLeft: getWidth(94) }}>
                        <TextInput 
                            style={styles.input} 
                            multiline={true}
                            value={content}
                            onChangeText={text => setContent(text)}/>
                        {_photoAdd()}
                        
                    </View> 
                </View> 
            </ScrollView>
        </ImageBackground>
        
    )
};

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        top: getHeight(30),
        left: getWidth(135),
        right: getWidth(135),
    },
    diaryborder:{
        borderRadius: 13,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: theme.pinkTheme,
        width: getWidth(324),
        marginTop: getHeight(123),
        left: getWidth(18),
        flex: 0,
        paddingTop: getHeight(20),
        paddingBottom: getHeight(20),
    },
    add:{
        position:'absolute',
        width: getWidth(10),
        borderRadius: 10,
        backgroundColor: theme.diaryadd,
        marginTop: getHeight(20),
        left: getWidth(67),
        right: getWidth(247),
        height:'100%', 
        resizeMode: 'contain',
    },
    imges : {
        width: getWidth(200),
        height: getHeight(100),
        backgroundColor: 'white',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#eec5c2",
        marginTop: getHeight(7),
    },
    input: {
        marginTop: getHeight(11),
        marginBottom: getHeight(11),
        width: getWidth(200),
        backgroundColor: 'white',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#eec5c2",
        paddingLeft: getWidth(6),
        paddingTop: getHeight(7),
        fontFamily: '나눔손글씨 중학생',
        fontSize: 15.5,
        color: theme.blackText,
    }
});



export default DiaryWrite;