import React, {useContext, useState, useEffect} from 'react';
import {Image, Dimensions, View, ImageBackground, ScrollView, Switch} from 'react-native';
import styled, {ThemeContext} from "styled-components/native";
import {images} from "../images";
import {EmotionRatio, LocationRank} from "../components";
import {BasicContext, ProgressContext} from "../contexts";

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


const AccountText = styled.Text`
font-family: '나눔손글씨 중학생';
font-size: ${({size}) => getFontSize(size)}px;
font-style: normal;
letter-spacing: 0;
text-align: left;
color: ${({theme}) => theme.blackText};
`;




const Mypage = () => {
    const theme = useContext(ThemeContext);
    const {userInfo, nickName, isPublic, setIsPublic} = useContext(BasicContext);
    const {spinner} = useContext(ProgressContext);
    const [email, setEmail] = useState('아이디@gmail.com');
    const [name, setName] = useState(nickName);
    const [publicDiary, setPublicDiary] = useState(false);
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

    useEffect(() => {
      setIsPublic(publicDiary);
    }, [publicDiary]);

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
      };

    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}} resizeMode="cover">
          <ScrollView>
              <Image source={images.whiteBackground} style={{position: "absolute", top: getHeight(94) ,width: "100%"}} resizeMode="stretch"/>
              {/*프로필 사진*/}
              <View style={{position: "absolute", top: getHeight(50), left: getWidth(132), justifyContent: 'center', alignItems: 'center'}}>
                {userInfo.profileImage? 
                (<Image source={{uri: userInfo.profileImage}} style={{position: "relative",width: getHeight(96), height: getHeight(96), borderWidth: 4, borderColor: theme.darkPinkIcon, borderRadius: getHeight(96)/2}} resizeMode="cover"/>)  
              : (
                <>
                <Image source={images.profile} style={{position: "relative",width: getWidth(96), height: getHeight(96),}} resizeMode="contain"/>
                <Image source={images.mypageCharacter} style={{position: "absolute"}} resizeMode="stretch"/>
                </>
              )}
              </View>

              {/*이메일*/}
              <View style={{position: "absolute", width: "100%", top: getHeight(153), justifyContent: 'center', alignItems: "center"}}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <AccountText size={25}>{userInfo.email}</AccountText>
                    <Image source={images.gooleIcon} style={{marginLeft: getWidth(5), width: getWidth(20), height: getHeight(20)}}/>
                  </View>

              {/*닉네임*/}  
              <AccountText size={25}>{name}</AccountText>

              {/*공개 설정*/}
              <View style={{flexDirection: "row", alignItems: "center", height: getHeight(23)}}>
                    <AccountText size={20}>전체공개</AccountText>
                    <AccountText size={20} style={{color: "white"}}>전</AccountText>
                    <Switch 
                    thumbColor={theme.toggleThumb}
                    toggleThumb
                    trackColor={{false: theme.toggleFalse, true: theme.toggleTrue}}
                    value={publicDiary}
                    onValueChange={() => setPublicDiary(prev => !prev)}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
                    />
                </View>
              </View>

              {/*통계 서비스*/}
              <View style={{width: getWidth(360), height: getHeight(781)}}>
              
              {/*월별 감정 비율*/}
              <InfoText top={250} left={40} size={30}>통계 서비스</InfoText>
              <InfoText top={300} left={40} size={20}>월별 감정 비율</InfoText>
            
              <EmotionRatio iconImage={images.excited} iconLeft={40} textLeft={40} ratioText={excitedRate} />
              <EmotionRatio iconImage={images.happy} iconLeft={95.8} textLeft={95.8} ratioText={happyRate} />
              <EmotionRatio iconImage={images.sad} iconLeft={157} textLeft={157} ratioText={sadRate} />
              <EmotionRatio iconImage={images.angry} iconLeft={216.7} textLeft={216.7} ratioText={angryRate} />
              <EmotionRatio iconImage={images.depressed} iconLeft={276.7} textLeft={276.7} ratioText={depressedRate} />

              {/*활발 지수*/}
              <InfoText top={440} left={40} size={20}>활발 지수</InfoText>
              <InfoText top={465} left={51.5} size={20}>{activityMent()}</InfoText>
              <Image source={images.diaryIcon} style={{position: "absolute", top: getHeight(502), left: getWidth(73), height: getHeight(37), width: getWidth(37)}} resizeMode="contain"/>
              <InfoText top={512} left={120} size={20}>{diaryCount}개</InfoText>
              <Image source={(diaryPrevCount < diaryCount)? images.upMark : images.downMark} resizeMode="contain" style={{position: "absolute", top: getHeight(506.1), left: getWidth(140), height: getHeight(23.9), width: getWidth(20)}}/>
              <Image source={images.locationIcon} style={{position: "absolute", top: getHeight(502), left: getWidth(204), height: getHeight(38.1), width: getWidth(36)}} resizeMode="contain"/>
              <InfoText top={512} left={250} size={20}>{locCount}개</InfoText>
              <Image source={(locPrevCount < locCount)? images.upMark : images.downMark} resizeMode="contain" style={{position: "absolute", top: getHeight(506.1), left: getWidth(274), height: getHeight(23.9), width: getWidth(20)}}/>

             {/*위치 통계*/}
              <InfoText top={580} left={40} size={20}>위치 통계</InfoText>

              <LocationRank iconTop={618} iconImage={images.first} iconText={1} locationText={firstLoc} locationTop={621} />
              <LocationRank iconTop={666} iconImage={images.second} iconText={2} locationText={secondLoc} locationTop={671} />
              <LocationRank iconTop={714} iconImage={images.third} iconText={3} locationText={thirdLoc} locationTop={721} />

            </View>
          </ScrollView>
        </ImageBackground>
        )
};


export default Mypage;