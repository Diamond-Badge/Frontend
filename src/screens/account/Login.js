import React, {useEffect} from 'react';
import {Text, View, StatusBar, Button, Dimensions, Image, TouchableOpacity} from 'react-native';
import styled from "styled-components/native";
import {images} from "../../images";
import {getFontSize, getWidth, getHeight} from "../.././hooks/caculateSize";

const loginFont = getFontSize(50);

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

  const _onPress = () => {
    navigation.navigate("NickName")
  }

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
      <LoginCon x={480} y={50} onPress={() => navigation.navigate("NickName")}>
        <LoginButton source={images.kakaoLogin}/>
      </LoginCon>
      <LoginCon x={540} y={50} onPress={_onPress}>
        <LoginButton source={images.naverLogin}/>
      </LoginCon>
      <LoginCon x={600} y={50} onPress={_onPress}>
        <LoginButton source={images.googleLogin}/>
      </LoginCon>
    </View>
  );
};

export default Login;