import React, {useEffect, useState, useContext} from 'react';
import {Text, View, StatusBar, Button, Dimensions, Image, TouchableOpacity} from 'react-native';
import styled from "styled-components/native";
import {images} from "../../images";
import {getFontSize, getWidth, getHeight} from "../.././hooks/caculateSize";
import * as KakaoLogin from "@react-native-seoul/kakao-login";
import * as NaverLogin from "@react-native-seoul/naver-login";
import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import {ProgressContext, BasicContext} from "../../contexts";

const loginFont = getFontSize(50);

GoogleSignin.configure({
  webClientId: "774708555233-j6sf1mrqhfbrldu3r3ae4dc2vi5pb03i.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
  offlineAccess: true,
});

const androidKeys = {
  kConsumerKey: "TMhSMPDrwSW4RIt1KM0a",
  kConsumerSecret: "Ho04pDCBP2",
  kServiceAppName: "테스트앱(안드로이드)",
};

const LoginText = styled.Text`
  font-family: '나눔손글씨 중학생';
  position: absolute;
  top:  ${getHeight(130)}px;
  left: ${getWidth(50)}px;
  font-size: ${loginFont}px;
  font-style: normal;
  letter-spacing: 0;
  text-align: left;
  color: ${({theme}) => theme.blackText};
`;

const RedCon = styled.View`
  position: absolute;
  top:  ${getHeight(226)}px;
  left: ${getWidth(60.5)}px;
  width: ${getWidth(132.8)}px;
  height: ${getHeight(161)}px;
  justify-content: center;
  align-content: center;
`;


const YellowCon = styled.View`
  position: absolute;
  top:   ${getHeight(285.8)}px;
  left:  ${getWidth(166.8)}px;
  width: ${getWidth(132)}px;
  height: ${getHeight(148.2)}px;
  justify-content: center;
  align-content: center;
`;



const LoginCon = styled.TouchableOpacity`
  position: absolute;
  top:  ${({x}) => getHeight(x)}px;
  left: ${getWidth(50)}px;
`;

const LoginButton = styled.Image`
  width: ${getWidth(260)}px;
  height: ${getHeight(40)}px;
`;

const Login = ({navigation}) => {
  const {setLoginSuccess, setProvier, setToken, setUserInfo} = useContext(BasicContext);
  const {spinner} = useContext(ProgressContext);
  
  const signWithKakao = async () => {
    var result = await KakaoLogin.login();
    if(result) {
      let token = result.accessToken;
      let prof = await KakaoLogin.getProfile();
      let image = prof.thumbnailImageUrl;
      let email = prof.email;
      let info = {
        profileImage: image,
        email: email,
      };
      if(email){
        setProvier("kakao");
        setToken(token);
        setUserInfo(info);
        //local 자동 로그인 시 수정 예정 
        navigation.navigate("NickName");
      }else{
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
      }
    }else{
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
    }
  };

  const naverLoginProcess = () => {
    return new Promise((resolve, reject) => {
      NaverLogin.NaverLogin.login(androidKeys, (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);       
      });
    });
  };

  const signWithNaver = async () => {

    
      let result = await naverLoginProcess();
      if(result){
        let token = result.accessToken;
        let profile = await NaverLogin.getProfile(token);
        let email = profile.response.email;
        let image = profile.response.profile_image;
        let info = {
          profileImage: image,
          email: email,
        }
        if(email){
          setProvier("naver");
          setToken(token);
          setUserInfo(info);
          navigation.navigate("NickName"); 
        }else{
          alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
        }
      }else{
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
      }
  };

  // 애뮬레이터 등록 sha-1 관련 이슈 있어서 우선 넘김 
  const signWithGoogle = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      let result = await GoogleSignin.getTokens();
      let token = result.accessToken;
      let email = userInfo.user.email;
      let image = userInfo.user.photo;
      let info = {
        profileImage: image,
        email: email,
      }
      if(email){
        setProvier("google");
        setToken(token);
        setUserInfo(info);
        navigation.navigate("NickName"); 
      }else{
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
      }
    }catch (error) {
      console.log(error.message);
      if(error.code === statusCodes.SIGN_IN_CANCELLED){
        console.log('User Cancelled the Login Flow');
      }else if(error.code === statusCodes.IN_PROGRESS){
        console.log('Signing In');
      }else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
        console.log('Play Services Not Available');
      }else {
        console.log('Some other Error Happened');
      }
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } 
  };

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar barStyle='dark-content' backgroundColor="transparent" />
        <LoginText>로그인</LoginText>      
      <RedCon>
        <Image source={images.redCharacter} />
      </RedCon>
      <YellowCon>
        <Image source={images.yellowCharacter} />
      </YellowCon>
      
      {/* 로그인 버튼들*/}
      <LoginCon x={480} y={50} onPress={signWithKakao}>
        <LoginButton source={images.kakaoLogin}/>
      </LoginCon>
      <LoginCon x={540} y={50} onPress={signWithNaver}>
        <LoginButton source={images.naverLogin}/>
      </LoginCon>
      <LoginCon x={600} y={50} onPress={signWithGoogle}>
        <LoginButton source={images.googleLogin}/>
      </LoginCon>
    </View>
  );
};

export default Login;