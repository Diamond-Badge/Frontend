import React, {useContext, useState} from 'react';
import {Image, Dimensions, View, ImageBackground, ScrollView, Switch} from 'react-native';
import styled, {ThemeContext} from "styled-components/native";
import {images} from "../images";

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const DHeight = (HEIGHT*(1/781)).toFixed(2); 
const DWidth = (WIDTH*(1/360)).toFixed(2);

const getHeight = dp => {
  return DHeight*dp;
};

const getWidth = dp => {
  return DWidth*dp;
};

const getFontSize = sp => {
  return ((sp*HEIGHT)/760).toFixed(2);
};

const InfoText = styled.Text`
  font-family: '나눔손글씨 중학생';
  font-size: ${({size}) => getFontSize(size)}px;
  position: absolute;
  top: ${({top}) => getHeight(top)}px;
  left: ${({left}) => getWidth(left)}px;
  font-style: normal;
  letter-spacing: 0;
  text-align: left;
  color: ${({theme}) => theme.blackText};
`;

const EmotionIcon = styled.Image`
  position: absolute;
  top: ${({top}) => getHeight(top)}px;
  left: ${({left}) => getWidth(left)}px;
  height: ${getHeight(43.3)}px;
  width: ${getWidth(42.5)}px;
`;

const AccountText = styled.Text`
font-family: '나눔손글씨 중학생';
font-size: ${({size}) => getFontSize(size)}px;
font-style: normal;
letter-spacing: 0;
text-align: left;
color: ${({theme}) => theme.blackText};
`;

const EmotionRateText = styled.Text`
font-family: '나눔손글씨 중학생';
font-size: ${getFontSize(20)}px;
font-style: normal;
letter-spacing: 0;
text-align: left;
color: ${({theme}) => theme.blackText};
`;



const Mypage = () => {
    const theme = useContext(ThemeContext);
    const [email, setEmail] = useState('아이디@gmail.com');
    const [name, setName] = useState('닉네임');
    const [isPublic, setIsPublic] = useState(false);
    const [excitedRate, setExcitedRate] = useState(17);
    const [happyRate, setHappyRate] = useState(23);
    const [sadRate, setSadRate] = useState(31);
    const [angryRate, setAngryRate] = useState(8);
    const [depressedRate, setDepressedRate] = useState(21);
    const [firstLoc, setFirstLoc] = useState('장소이름 1');
    const [secondLoc, setSecondLoc] = useState('장소이름 2');
    const [thirdLoc, setThirdLoc] = useState('장소이름 3');
    const [diaryCount, setDiaryCount] = useState(5);
    const [locCount, setLocCount] = useState(6);
    const [diaryPrevCount, setDiaryPrevCount] = useState(3);
    const [locPrevCount, setLocPrevCount] = useState(4);

  const activityMent = () => {
    if((diaryCount===diaryPrevCount)&&(locCount===locPrevCount)){
      return name+"님은 저번 달만큼 활발하셨군요!";
    }else if((diaryCount > diaryPrevCount)&&(locCount > locPrevCount)){
      return name+"님은 저번 달에 비해 더 활발해지셨네요!";
    }else if((diaryCount < diaryPrevCount)&&(locCount < locPrevCount)){
      return name+"님은 저번 달에 비해 덜 활발해지셨네요!";
    }else{
      return name+"님은 저번 달과 비슷하게 활발하셨군요!";
    }
  }

    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}} resizeMode="cover">
          <ScrollView>
          <Image source={images.whiteBackground} style={{position: "absolute", top: getHeight(94) ,width: "100%"}} resizeMode="stretch"/>
              <View style={{position: "absolute", top: getHeight(50), left: getWidth(132), justifyContent: 'center', alignItems: 'center'}}>
                <Image source={images.profile} style={{position: "relative",width: getWidth(96), height: getHeight(96),}} resizeMode="contain"/>
                <Image source={images.mypageCharacter} style={{position: "absolute"}} resizeMode="stretch"/>
              </View>
              <View style={{position: "absolute", width: getWidth(138) ,top: getHeight(153), left: getWidth(111), justifyContent: 'center', alignItems: "center"}}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <AccountText size={25}>{email}</AccountText>
                    <Image source={images.gooleIcon} style={{marginLeft: getWidth(5), width: getWidth(20), height: getHeight(20)}}/>
                  </View>
                <AccountText size={25}>{name}</AccountText>
                <View style={{flexDirection: "row", alignItems: "center", height: getHeight(23)}}>
                    <AccountText size={20}>전체공개</AccountText>
                    <AccountText size={20} style={{color: "white"}}>전</AccountText>
                    <Switch 
                    thumbColor={theme.toggleThumb}
                    toggleThumb
                    trackColor={{false: theme.toggleFalse, true: theme.toggleTrue}}
                    value={isPublic}
                    onValueChange={() => setIsPublic(prev => !prev)}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
                    />
                </View>
              </View>
            <View style={{width: getWidth(360), height: getHeight(781)}}>
              <InfoText top={250} left={40} size={30}>감정 통계 서비스</InfoText>
              <InfoText top={300} left={40} size={20}>월별 감정 비율</InfoText>
              <EmotionIcon source={images.excited} top={342} left={40} resizeMode="contain"/>
              <View style={{position: "absolute", width: getWidth(42.5), top: getHeight(386), left: getWidth(40), alignItems: "center"}}><EmotionRateText>{excitedRate}%</EmotionRateText></View>
              <EmotionIcon source={images.happy} top={342} left={95.8} resizeMode="contain"/>
              <View style={{position: "absolute", width: getWidth(42.5), top: getHeight(386), left: getWidth(95.8), alignItems: "center"}}><EmotionRateText>{happyRate}%</EmotionRateText></View>
              <EmotionIcon source={images.sad} top={342} left={157} resizeMode="contain"/>
              <View style={{position: "absolute", width: getWidth(42.5), top: getHeight(386), left: getWidth(157), alignItems: "center"}}><EmotionRateText>{sadRate}%</EmotionRateText></View>
              <EmotionIcon source={images.angry} top={342} left={216.7} resizeMode="contain"/>
              <View style={{position: "absolute", width: getWidth(42.5), top: getHeight(386), left: getWidth(216.7), alignItems: "center"}}><EmotionRateText>{angryRate}%</EmotionRateText></View>
              <EmotionIcon source={images.depressed} top={342} left={276.7} resizeMode="contain"/>
              <View style={{position: "absolute", width: getWidth(42.5), top: getHeight(386), left: getWidth(276.7), alignItems: "center"}}><EmotionRateText>{depressedRate}%</EmotionRateText></View>
              
              <InfoText top={440} left={40} size={20}>활발 지수</InfoText>
              <InfoText top={465} left={51.5} size={20}>{activityMent()}</InfoText>
              <Image source={images.diaryIcon} style={{position: "absolute", top: getHeight(502), left: getWidth(73), height: getHeight(37), width: getWidth(37)}} resizeMode="contain"/>
              <InfoText top={512} left={120} size={20}>{diaryCount}개</InfoText>
              <Image source={(diaryPrevCount < diaryCount)? images.upMark : images.downMark} resizeMode="contain" style={{position: "absolute", top: getHeight(506.1), left: getWidth(140), height: getHeight(23.9), width: getWidth(20)}}/>
              <Image source={images.locationIcon} style={{position: "absolute", top: getHeight(502), left: getWidth(204), height: getHeight(38.1), width: getWidth(36)}} resizeMode="contain"/>
              <InfoText top={512} left={250} size={20}>{locCount}개</InfoText>
              <Image source={(locPrevCount < locCount)? images.upMark : images.downMark} resizeMode="contain" style={{position: "absolute", top: getHeight(506.1), left: getWidth(274), height: getHeight(23.9), width: getWidth(20)}}/>

              <InfoText top={580} left={40} size={20}>위치 통계</InfoText>
              <View style={{position: "absolute", top: getHeight(618), left: getWidth(60), justifyContent: 'center', alignItems: 'center'}}>
                <Image source={images.first} style={{position: "relative",width: getWidth(30), height: getHeight(30)}} resizeMode="contain"/>
                <AccountText size={25} style={{position: "absolute"}}>1</AccountText>
              </View>
              <AccountText size={20} style={{position: "absolute", top: getHeight(621), left: getWidth(100)}}>{firstLoc}</AccountText>
              
              <View style={{position: "absolute", top: getHeight(666), left: getWidth(60), justifyContent: 'center', alignItems: 'center'}}>
                <Image source={images.second} style={{position: "relative",width: getWidth(30), height: getHeight(30)}} resizeMode="contain"/>
                <AccountText size={25} style={{position: "absolute"}}>2</AccountText>
              </View>
              <AccountText size={20} style={{position: "absolute", top: getHeight(671), left: getWidth(100)}}>{secondLoc}</AccountText>
              
              <View style={{position: "absolute", top: getHeight(714), left: getWidth(60), justifyContent: 'center', alignItems: 'center'}}>
                <Image source={images.third} style={{position: "relative",width: getWidth(30), height: getHeight(30)}} resizeMode="contain"/>
                <AccountText size={25} style={{position: "absolute"}}>3</AccountText>
              </View>
              <AccountText size={20} style={{position: "absolute", top: getHeight(721), left: getWidth(100)}}>{thirdLoc}</AccountText>
            </View>
            </ScrollView>
        </ImageBackground>
        )
};


export default Mypage;