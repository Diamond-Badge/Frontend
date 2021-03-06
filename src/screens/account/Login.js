import React, {useContext} from 'react';
import {View, StatusBar, Image} from 'react-native';
import styled from "styled-components/native";
import {images} from "../../images";
import {getFontSize, getWidth, getHeight} from "../.././hooks/caculateSize";
import * as KakaoLogin from "@react-native-seoul/kakao-login";
import * as NaverLogin from "@react-native-seoul/naver-login";
import {GoogleSignin, statusCodes} from "@react-native-google-signin/google-signin";
import {ProgressContext, BasicContext, UrlContext} from "../../contexts";
import Geolocation from "@react-native-community/geolocation";

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
  const {setLoginSuccess, setJwt, setNickName, setUserInfo, setLocation ,setIsPublic, setProvier} = useContext(BasicContext);
  const {spinner} = useContext(ProgressContext);
  const {url} = useContext(UrlContext);
  
  // 이미 가입한 회원인지 판별 수정시간이랑 생성시간이랑 같은지로 판단
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
      console.log(res);
      if(res.success){
            let em = res.data.email;
            let created = res.data.createdAt;
            let modified = res.data.modifiedAt;
            let un = res.data.username;
            let image = res.data.profileImageUrl;
            let providerType = res.data.providerType;
            let isPrivate = res.data.private;
            let info = {
              profileImage: image,
              email: em,
            };
            console.log("createdAt: "+created);
            console.log("modifiedAt: "+modified);
            setUserInfo(info);
            setIsPublic(!isPrivate);
            setProvier(providerType);
            // 같은지 아닌지로 이전에 가입한지 판별 
            if(created===modified){
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

// 위치 얻기 
const geoLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
          const latitude = parseFloat(JSON.stringify(position.coords.latitude));
          const longitude = parseFloat(JSON.stringify(position.coords.longitude));
          let loc = {
            latitude: latitude,
            longitude: longitude,
          };
          setLocation(loc);
          return loc;
      },
      error => { console.log(error.code, error.message); },
      {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
  )
};

  // 서버로 소셜 accesstoken 보내서 jwt 받기 
  const FetchToken = async (tokenPrameter, provider) => {
    let fixedUrl = url+"/api/v1/auth/signin/"+provider+"?accessToken="+tokenPrameter;
  
    let option = {
      method: 'POST',
      headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
  
    try{
      spinner.start();
      let response = await fetch(fixedUrl, option);
      let res = await response.json();
      console.log("fetch: "+tokenPrameter);
      console.log(res);
      console.log(fixedUrl);
      if(res.success){
            let jwtoken = res.data;
            setJwt(jwtoken);
            // 이미 가입한 경우에는 바로 메인 탭으로, 새 회원인 경우에는 닉네임 설정으로 이동.
            let signed = await CheckSigned(jwtoken);
            let loc = geoLocation();
            console.log("loc 결과는?")
            console.log(loc);
            if(signed==="not"){
              if(loc===undefined){
                setTimeout(() => {
                  setLoginSuccess(true);
                }, 2000)
              }
            }else if(signed==="new"){
              if(loc===undefined){
                setTimeout(() => {
                  navigation.navigate("NickName");
                }, 2000)
              }
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
    let kakaoResult = await KakaoLogin.login();
    if(kakaoResult) {
      let kakaoToken = kakaoResult.accessToken;
      await FetchToken(kakaoToken, "kakao");
      }else{
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
      }
  };

  // 네이버 access token 받기 
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
      let naverResult = await naverLoginProcess();
      if(naverResult){
        let naverToken = naverResult.accessToken;
        console.log("naver process: "+naverToken);
        await FetchToken(naverToken, "naver");
      }else{
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."); // 예외 처리 임시 
      }
  };
 
  const signWithGoogle = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      let googleResult = await GoogleSignin.getTokens();
      let googleToken = googleResult.accessToken;
      await FetchToken(googleToken, "google");
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