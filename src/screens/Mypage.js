import React, {useContext, useState, useEffect} from 'react';
import {Image, Alert ,Dimensions, View, ImageBackground, ScrollView, Switch, TouchableOpacity} from 'react-native';
import styled, {ThemeContext} from "styled-components/native";
import {images} from "../images";
import {EmotionRatio, LocationRank} from "../components";
import {BasicContext, ProgressContext, UrlContext} from "../contexts";
import DialogInput from "react-native-dialog-input";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";


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
    const {userInfo, nickName, isPublic, setIsPublic, provider, setLoginSuccess, jwt, setNickName, setUserInfo} = useContext(BasicContext);
    const {url} = useContext(UrlContext);
    const {spinner} = useContext(ProgressContext);
    const [publicDiary, setPublicDiary] = useState(isPublic);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
      console.log(userInfo);
    },[]);

    //감정 통계
    const [excitedRate, setExcitedRate] = useState(17);
    const [happyRate, setHappyRate] = useState(23);
    const [sadRate, setSadRate] = useState(31);
    const [angryRate, setAngryRate] = useState(8);
    const [depressedRate, setDepressedRate] = useState(21);
    
    //장소통계
    const [firstLoc, setFirstLoc] = useState('장소이름 1');
    const [secondLoc, setSecondLoc] = useState('장소이름 2');
    const [thirdLoc, setThirdLoc] = useState('장소이름 3');

    // 활발지수
    const [diaryCount, setDiaryCount] = useState(5);
    const [locCount, setLocCount] = useState(6);
    const [diaryPrevCount, setDiaryPrevCount] = useState(3);
    const [locPrevCount, setLocPrevCount] = useState(4);
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
      if(isFirst===false){
        setIsPublic(publicDiary);
        FetchPublic();
        console.log(publicDiary)
      }
    }, [publicDiary]);

    // 닉네임 변경 
    const FetchPublic = async () => {
      let fixedUrl = url+"/api/v1/user/isPublic";

      let option ={
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Autorization': jwt,
        }
      };
    
      try{
        spinner.start();
        let response = await fetch(fixedUrl, option);
        let res = await response.json();
        if(res.success){
          console.log(res);
        }else{
          alert("오류 발생하였습니다. 잠시 후 다시 이용해주세요.");
        }
      }catch(e)
      {
       console.log(e)
      }finally{
        spinner.stop();
      }
    };

    // 닉네임 변경 
    const FetchNick = async (nameText) => {
      let fixedUrl = url+"/api/v1/user/name?userName="+nameText;
    

      let option ={
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Autorization': jwt,
        }
      };
    
      try{
        spinner.start();
        let response = await fetch(fixedUrl, option);
        let res = await response.json();
        if(res.success){
          setShowDialog(false);
          setNickName(nameText);
        }else{
          alert("오류 발생하였습니다. 잠시 후 다시 이용해주세요.");
        }
      }catch(e)
      {
       console.log(e)
      }finally{
        spinner.stop();
      }
    };

    // provider에 따른 이메일 옆 소셜 아이콘 선정 
    const getProviderIcon = () => {
      if(provider==="NAVER"){
        return images.naverIcon;
      }else if(provider==="KAKAO"){
        return images.kakaoIcon;
      }else if(provider==="GOOGLE"){
        return images.googleIcon;
      }else{
        return null;
      }
    };

    // 활발 지수에 따른 멘트 (로직 리뷰 필요)
    const activityMent = () => {
        if((diaryCount===diaryPrevCount)&&(locCount===locPrevCount)){
          return nickName+"님은 저번 달만큼 활발하셨군요!";
        }else if((diaryCount > diaryPrevCount)&&(locCount > locPrevCount)){
          return nickName+"님은 저번 달에 비해 더 활발해지셨네요!";
        }else if((diaryCount < diaryPrevCount)&&(locCount < locPrevCount)){
          return nickName+"님은 저번 달에 비해 덜 활발해지셨네요!";
        }else{
          return nickName+"님은 저번 달과 비슷하게 활발하셨군요!";
        }
      };


    //로그아웃 
    const _onLogout = () => {
      Alert.alert(
        "", "로그아웃하시겠습니까?",
        [{ text: "취소", style: "cancel" ,onPress: () => {
                          
                        }},
        { text: "확인", onPress: () => {
            setLoginSuccess(false);
        }}], {cancelable: true});
    };

    // 회원탈퇴
    const _onDelete = () => {
      Alert.alert(
        "", "탈퇴하시겠습니까?",
        [{ text: "취소", style: "cancel", onPress: () => {
                          
        }},
        { text: "확인", onPress: () => {
          setLoginSuccess(false);
        }}], {cancelable: true});
    };
 

    // 이미지 등록 
    const uploadImage = async (path) => {
      let fixedUrl = url+'/api/v1/user/profile';

      let formData = new FormData();

      let filename = path.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let fileInfo = {
          uri: path,
          name: filename,
          type: type
      };
      formData.append('file', fileInfo);

      let option ={
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Autorization': jwt,
        },
        body: formData,
      };

      try{
        spinner.start();
        console.log(option);
        console.log(fixedUrl);
        let response = await fetch(fixedUrl, option);
        let res = await response.json();
        console.log(res);
        if(res.success){
          console.log("성공!");
        }else{
          alert("오류 발생하였습니다. 잠시 후 다시 이용해주세요.");
        }
      }catch(e)
      {
       console.log(e)
      }finally{
        spinner.stop();
      }
      
      
    


    };

    // 이미지 선택 - 카메라
    const getFromCamera = async () => {
      let result = await launchCamera({}, res => {
        let path = res.assets[0].uri;
        if(path!==""){
          uploadImage(path);
        }else{
          alert("잘못된 이미지입니다. 다시 선택해주세요."); //임시 에러 처리
        }
      });
    };

    // 이미지 선택 - 앨범
    const getFromGallery = async () => {
      let result = await launchImageLibrary({}, res => {
        let path = res.assets[0].uri;
        if(path!==""){
          uploadImage(path);
        }else{
          alert("잘못된 이미지입니다. 다시 선택해주세요."); //임시 에러 처리
        }
      });
    };

    // 이미지 선택 modal
    const _onImagePress = () => {
      Alert.alert(
        "프로필 사진", "",
        [{ text: "기본 이미지로 변경", onPress: () => {
              
        }},
        { text: "카메라 찍기", onPress: () => {
            let cameraPath = getFromCamera(); 
        }},
        { text: "앨범에서 선택", onPress: () => {
            let galleryPath = getFromGallery();
        }}], {cancelable: true});
    };

    // 닉네임 변경 클릭 이벤트 
    const _onNamePress = (text) => {
      FetchNick(text);
    };

    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}} resizeMode="cover">
          <ScrollView>
              <Image source={images.whiteBackground} style={{position: "absolute", top: getHeight(94), right: -2, width: "102%", height: "100%"}} resizeMode="stretch"/>
              {/*프로필 사진*/}
              <View style={{position: "absolute", top: getHeight(50), left: getWidth(132), justifyContent: 'center', alignItems: 'center'}}>
                {userInfo.profileImage? 
                (<Image source={""} style={{position: "relative",width: getHeight(96), height: getHeight(96), borderWidth: 4, borderColor: theme.darkPinkIcon, borderRadius: getHeight(96)/2}} resizeMode="cover"/>)  
              : (
                <>
                <Image source={images.profile} style={{position: "relative",width: getWidth(96), height: getHeight(96),}} resizeMode="contain"/>
                <Image source={images.mypageCharacter} style={{position: "absolute"}} resizeMode="stretch"/>
                </>
              )}
              <TouchableOpacity onPress={_onImagePress} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(33), height: getHeight(33), backgroundColor: "white", borderRadius: getHeight(33)/2, borderWidth: 3, borderColor: theme.darkPinkIcon ,justifyContent: "center", alignItems: "center"}}>
                <Image style={{width: getWidth(18.4), height: getHeight(18.4)}} source={images.pencil} />
              </TouchableOpacity>
              </View>

              {/*이메일*/}
              <View style={{position: "absolute", width: "100%", top: getHeight(153), justifyContent: 'center', alignItems: "center"}}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <AccountText size={25}>{userInfo.email}</AccountText>
                    <Image source={getProviderIcon()} style={{marginLeft: getWidth(5), width: getWidth(20), height: getHeight(20)}}/>
                  </View>

              {/*닉네임*/}  
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <AccountText size={25}>{nickName}</AccountText>
                <TouchableOpacity onPress={() => {setShowDialog(true)}}><Image source={images.pencil} style={{marginLeft: getWidth(5), width: getWidth(15), height: getHeight(15)}}/></TouchableOpacity>
              </View>

              <DialogInput isDialogVisible={showDialog}
                  title={"닉네임 변경"}
                  hintInput ={"변경할 닉네임을 입력하세요."}
                  submitInput={ (inputText) => {_onNamePress(inputText)} }
                  closeDialog={ () => {setShowDialog(false)}}>
              </DialogInput>

              {/*공개 설정*/}
              <View style={{flexDirection: "row", alignItems: "center", height: getHeight(23)}}>
                    <AccountText size={20}>전체공개</AccountText>
                    <AccountText size={20} style={{color: "white"}}>전</AccountText>
                    <Switch 
                    thumbColor={theme.toggleThumb}
                    toggleThumb
                    trackColor={{false: theme.toggleFalse, true: theme.toggleTrue}}
                    value={publicDiary}
                    onValueChange={() => {
                      setIsFirst(false);
                      setPublicDiary(prev => !prev);
                    }}
                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
                    />
                </View>
              </View>

              {/*통계 서비스*/}
              <View style={{width: getWidth(360), height: getHeight(1000)}}>
              
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

              {/*계정 관리*/}
              <InfoText top={800} left={40} size={30}>계정 관리</InfoText>
              <TouchableOpacity onPress={_onLogout}>
                <InfoText top={851} left={40} size={20}>로그 아웃</InfoText>
              </TouchableOpacity>
              <TouchableOpacity onPress={_onDelete}>
                <InfoText top={897} left={40} size={20}>회원 탈퇴</InfoText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
        )
};


export default Mypage;