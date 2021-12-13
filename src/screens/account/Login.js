import React, {useContext} from 'react';
import {View, StatusBar, Image} from 'react-native';
import styled from "styled-components/native";
import {images} from "../../images";
import {getFontSize, getWidth, getHeight} from "../.././hooks/caculateSize";
import * as KakaoLogin from "@react-native-seoul/kakao-login";
import * as NaverLogin from "@react-native-seoul/naver-login";
import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import {ProgressContext, BasicContext, UrlContext} from "../../contexts";

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
  const {setLoginSuccess, setToken, setJwt, setNickName, setUserInfo, setIsPublic, setProvier} = useContext(BasicContext);
  const {spinner} = useContext(ProgressContext);
  const {url} = useContext(UrlContext);
  
  // 이미 가입한 회원인지 판별 등록한 닉네임이랑 이메일이랑 같은지로 판단
  // 이미 가입한 경우에는 바로 메인 탭으로, 새 회원인 경우에는 닉네임 설정으로 이동.
  const CheckSigned = async (jwtData) => {
    let fixedUrl = url+"/api/v1/user";
  
    let option ={
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'Autorization': jwtData,
      }
    };

    try{
      spinner.start();
      let response = await fetch(fixedUrl, option);
      let res = await response.json();
      if(res.success){
            // 이메일
            let em = res.data.email;
            // 닉네임
            let un = res.data.username;
            let image = res.data.profileImageUrl;
            let providerType = res.data.providerType;
            let isPrivate = res.data.private;
            let info = {
              profileImage: image,
              email: em,
            };
            setUserInfo(info);
            setIsPublic(!isPrivate);
            setProvier(providerType);
            // 같은지 아닌지로 이전에 가입한지 판별 
            if(em===un){
                return "new";
            }else{
                setNickName(un);
                return "not";
            }
      }else{
        return "error";
      }
    }catch(e){
      console.log(e);
    }finally{
      spinner.stop();
    }
};

  // 서버로 소셜 accesstoken 보내서 jwt 받기 
  const FetchToken = async (token, provider) => {
    let fixedUrl = url+"/api/v1/auth/signin/"+provider+"?accessToken="+token;
  
    let option = {
      method: 'POST',
      headers: {
        Accept: 'application/json',   
        'Content-Type': 'application/json'
      }
    };
  
    try{
      spinner.start();
      let response = await fetch(fixedUrl, option);
      let res = await response.json();
      if(res.success){
            let jwtoken = res.data;
            setJwt(jwtoken);
            // 이미 가입한 경우에는 바로 메인 탭으로, 새 회원인 경우에는 닉네임 설정으로 이동.
            let signed = await CheckSigned(jwtoken);
            console.log(signed);
            if(signed==="not"){
              setLoginSuccess(true);
            }else if(signed==="new"){
              navigation.navigate("NickName");
            }else{
              alert("오류 발생하였습니다. 잠시 후 다시 이용해주세요.");
            }
      }else{
        alert("오류 발생하였습니다. 잠시 후 다시 이용해주세요.");
      }
    }catch(e){
     console.log(e)
    }finally{
      spinner.stop();
    }
  };

  const signWithKakao = async () => {
    var result = await KakaoLogin.login();
    if(result) {
      let token = result.accessToken;
      setToken(token);
      await FetchToken(token, "kakao");
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
        setToken(token);  
        await FetchToken(token, "naver");
      }else{
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
      }
  };
 
  const signWithGoogle = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      let result = await GoogleSignin.getTokens();
      let token = result.accessToken;
      setToken(token);
      await FetchToken(token, "google");
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