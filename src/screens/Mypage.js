import React, {useContext, useState, useEffect} from 'react';
import {Image, Alert ,Dimensions, View, ImageBackground, ScrollView, Switch, TouchableOpacity, Modal, TextInput} from 'react-native';
import styled, {ThemeContext} from "styled-components/native";
import {images} from "../images";
import {EmotionRatio, LocationRank} from "../components";
import {BasicContext, ProgressContext, UrlContext} from "../contexts";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import {removeWhitespace} from "../hooks/caculateSize";


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

const CountText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${({size}) => size? getFontSize(size): 25}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;




const Mypage = ({navigation}) => {
    const theme = useContext(ThemeContext);
    const {userInfo, nickName, isPublic, setIsPublic, provider, setLoginSuccess, jwt, setNickName, setUserInfo} = useContext(BasicContext);
    const {url} = useContext(UrlContext);
    const {spinner} = useContext(ProgressContext);
    const [publicDiary, setPublicDiary] = useState(isPublic);
    const [nickModal, setNickModal] = useState(false);
    const [nick, setNick] = useState("");
    const [imageModal, setImageModal] = useState(false);
    const [image, setImage] = useState(userInfo.profileImage);



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
    const [diaryCount, setDiaryCount] = useState(0);
    const [locCount, setLocCount] = useState(0);
    const [isFirst, setIsFirst] = useState(true);

    // 계정 설정 
    const [logoutModal, setLogoutModal] = useState(false);
    const [signoutModal, setSignoutModal] = useState(false);

    useEffect(() => {
      if(isFirst===true){
        FetchInfo();
      }
      if(isFirst===false){
        setIsPublic(publicDiary);
        FetchPublic();
        console.log(publicDiary)
      }
      console.log("지금의 이미지는?")
      console.log(image);
    }, [publicDiary]);

    const DeleteAccount = async () => {
      let fixedUrl = url+"/api/v1/user";

      let option ={
        method: 'delete',
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
          alert("탈퇴되었습니다.");
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

    // 통계 정보 불러오기
    const FetchInfo = async () => {
      let fixedUrl = url+"/api/v1/statistics";

      let option ={
        method: 'get',
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
        console.log(res);
        if(res.success){
          let data = res.data;
          setAngryRate(data.angry);
          setDepressedRate(data.depressed);
          setExcitedRate(data.excited);
          setSadRate(data.sad);
          setHappyRate(data.happy);
          setFirstLoc(data.first);
          setSecondLoc(data.second);
          setThirdLoc(data.third);
          setDiaryCount(data.diaryCnt);
          setLocCount(data.locationCnt);
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
          setNickModal(false);
          setNickName(nameText);
          setNick("");
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
        if((diaryCount>=0)&&(locCount>=0)){
          return nickName+"님은 저번 달만큼 활발하셨군요!";
        }else if((diaryCount < 0)&&(locCount < 0)){
          return nickName+"님은 저번 달에 비해 덜 활발해지셨네요!";
        }else{
          return nickName+"님은 저번 달과 비슷하게 활발하셨군요!";
        }
      };


    //로그아웃 
    const _onLogout = () => {
      setLoginSuccess(false);
    };

    // 회원탈퇴
    const _onDelete = () => {
      DeleteAccount();
      setLoginSuccess(false);
    };
 
    // 이미지 등록 후 가져오기 
    const getImage = async () => {
      let fixedUrl = url+'/api/v1/user';

      let option ={
        method: 'get',
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
          console.log("이미지 불러오기 성공")
          let profileIm = res.data.profileImageUrl;
          setImage(profileIm);
          console.log(profileIm);
          let prevEmail = userInfo.email;
          setUserInfo({
            email: prevEmail,
            profileImageUrl: profileIm,
          });
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
        let response = await fetch(fixedUrl, option);
        let res = await response.json();
        if(res.success){
          console.log("이미지 등록 성공")
          await getImage();
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
        if(res.didCancel){
          return null;
        }else{
          let path = res.assets[0].uri;
          if(path!==""){
            uploadImage(path);
          }else{
            alert("잘못된 이미지입니다. 다시 선택해주세요."); //임시 에러 처리
          }
        }
      });
    };

    // 이미지 선택 - 앨범
    const getFromGallery = async () => {
      let result = await launchImageLibrary({}, res => {
        if(res.didCancel){
          return null;
        }else{
          let path = res.assets[0].uri;
          if(path!==""){
            uploadImage(path);
          }else{
            alert("잘못된 이미지입니다. 다시 선택해주세요."); //임시 에러 처리
          }
        }
      });
    };

    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}} resizeMode="cover">
          <ScrollView>
              <Image source={images.whiteBackground} style={{position: "absolute", top: getHeight(94), right: -2, width: "102%", height: "100%"}} resizeMode="stretch"/>
              {/*프로필 사진*/}
              <View style={{position: "absolute", top: getHeight(50), left: getWidth(132), justifyContent: 'center', alignItems: 'center'}}>
                {image? 
                (<Image source={{uri: image}} style={{position: "relative",width: getHeight(96), height: getHeight(96), borderWidth: 4, borderColor: theme.darkPinkIcon, borderRadius: getHeight(96)/2}} resizeMode="cover"/>)  
              : (
                <>
                <Image source={images.profile} style={{position: "relative",width: getWidth(96), height: getHeight(96),}} resizeMode="contain"/>
                <Image source={images.mypageCharacter} style={{position: "absolute"}} resizeMode="stretch"/>
                </>
              )}
              <TouchableOpacity onPress={() => setImageModal(true)} style={{position: "absolute", bottom: 0, right: 0, width: getWidth(33), height: getHeight(33), backgroundColor: "white", borderRadius: getHeight(33)/2, borderWidth: 3, borderColor: theme.darkPinkIcon ,justifyContent: "center", alignItems: "center"}}>
                <Image style={{width: getWidth(18.4), height: getHeight(18.4)}} source={images.pencil} />
              </TouchableOpacity>
              </View>

              {imageModal? (
                    <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: theme.whiteBackground, opacity: 0.3}}>
                        <Modal visible={imageModal} transparent={true} >
                            <View style={{position: "absolute", top: getHeight(260), alignSelf: "center", width: "90%", height: getHeight(120), borderRadius: 12, backgroundColor: theme.whiteBackground, borderStyle: "solid",
                                          borderColor: theme.edgePink, borderWidth: 4, alignItems: "center", paddingTop: getHeight(13)}}>
                                <CountText size={30}>프로필 이미지 변경</CountText>
                                <TouchableOpacity onPress={() => setImageModal(pre => !pre)} style={{position: "absolute", right: "5%", top: "5%"}}><CountText>X</CountText></TouchableOpacity>
                                <View style={{top: getHeight(73), position: "absolute", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                <TouchableOpacity onPress={() => setImageModal(pre => !pre)} style={{width: "30%", height: getHeight(30), backgroundColor: theme.greybutton, borderRadius: 7, justifyContent: "center", alignItems: "center"}}><CountText>기본 이미지</CountText></TouchableOpacity>
                                <TouchableOpacity onPress={() => {setImageModal(pre => !pre); let cameraPath = getFromCamera();}} style={{width: "30%", height: getHeight(30), backgroundColor: theme.pinkbutton, borderRadius: 7, justifyContent: "center", alignItems: "center"}}><CountText>카메라 찍기</CountText></TouchableOpacity>
                                <TouchableOpacity onPress={() => {setImageModal(pre => !pre); let galleryPath = getFromGallery();}} style={{width: "30%", height: getHeight(30), backgroundColor: theme.pinkbutton, borderRadius: 7, justifyContent: "center", alignItems: "center"}}><CountText>앨범에서 선택</CountText></TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>)
            : null}

              {/*이메일*/}
              <View style={{position: "absolute", width: "100%", top: getHeight(153), justifyContent: 'center', alignItems: "center"}}>
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <AccountText size={25}>{userInfo.email}</AccountText>
                    <Image source={getProviderIcon()} style={{marginLeft: getWidth(5), width: getWidth(20), height: getHeight(20)}}/>
                  </View>

              {/*닉네임*/}  
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <AccountText size={25}>{nickName}</AccountText>
                <TouchableOpacity onPress={() => {setNickModal(true)}}><Image source={images.pencil} style={{marginLeft: getWidth(5), width: getWidth(15), height: getHeight(15)}}/></TouchableOpacity>
              </View>

              {nickModal? (
                    <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: theme.whiteBackground, opacity: 0.3}}>
                        <Modal visible={nickModal} transparent={true}>
                            <View style={{position: "absolute", top: getHeight(260), left: getWidth(40), width: getWidth(280), height: getHeight(120), borderRadius: 12, backgroundColor: theme.whiteBackground, borderStyle: "solid",
                                          borderColor: theme.edgePink, borderWidth: 4, alignItems: "center", paddingTop: getHeight(13)}}>
                                <CountText>닉네임 변경</CountText>
                                <TextInput style={{fontFamily: '나눔손글씨 중학생', fontSize: 25, padding: 0, paddingLeft: 10, borderWidth: 0.7, borderBottomColor: "gray"}} value={nick} onChangeText={(text) => setNick(removeWhitespace(text))} placeholder='닉네임을 입력하세요' returnKeyType='done' onSubmitEditing={() => {FetchNick(nick)}}/>
                                <TouchableOpacity onPress={() => setNickModal(pre => !pre)} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), left: getWidth(40)}}><Image source={images.cancelButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    FetchNick(nick);
                                }} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), right: getWidth(40)}}><Image source={images.okButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                            </View>
                        </Modal>
                    </View>)
            : null}

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
              {
                (diaryCount != 0)? (
                  <Image source={(diaryCount >0)? images.upMark : images.downMark} resizeMode="contain" style={{position: "absolute", top: getHeight(506.1), left: getWidth(144), height: getHeight(23.9), width: getWidth(20)}}/>
                ) : null 
              }
              <Image source={images.locationIcon} style={{position: "absolute", top: getHeight(502), left: getWidth(204), height: getHeight(38.1), width: getWidth(36)}} resizeMode="contain"/>
              <InfoText top={512} left={250} size={20}>{locCount}개</InfoText>
              {
                (locCount != 0)? (
                  <Image source={(locCount >=0)? images.upMark : images.downMark} resizeMode="contain" style={{position: "absolute", top: getHeight(506.1), left: getWidth(274), height: getHeight(23.9), width: getWidth(20)}}/>
                ): null
              }


             {/*위치 통계*/}
              <InfoText top={580} left={40} size={20}>위치 통계</InfoText>

              <LocationRank iconTop={618} iconImage={images.first} iconText={1} locationText={firstLoc} locationTop={621} />
              <LocationRank iconTop={666} iconImage={images.second} iconText={2} locationText={secondLoc} locationTop={671} />
              <LocationRank iconTop={714} iconImage={images.third} iconText={3} locationText={thirdLoc} locationTop={721} />

              {/*계정 관리*/}
              <InfoText top={800} left={40} size={30}>계정 관리</InfoText>
              <TouchableOpacity onPress={() => setLogoutModal(true)}>
                <InfoText top={851} left={40} size={20}>로그 아웃</InfoText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSignoutModal(true)}>
                <InfoText top={897} left={40} size={20}>회원 탈퇴</InfoText>
              </TouchableOpacity>

              {logoutModal? (
                    <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: theme.whiteBackground, opacity: 0.3}}>
                        <Modal visible={logoutModal} transparent={true}>
                            <View style={{position: "absolute", top: getHeight(260), left: getWidth(40), width: getWidth(280), height: getHeight(120), borderRadius: 12, backgroundColor: theme.whiteBackground, borderStyle: "solid",
                                          borderColor: theme.edgePink, borderWidth: 4, alignItems: "center", paddingTop: getHeight(13)}}>
                                <CountText> 로그아웃하시겠습니까?</CountText>
                                <TouchableOpacity onPress={() => setLogoutModal(pre => !pre)} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), left: getWidth(40)}}><Image source={images.cancelButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setLogoutModal(pre => !pre);
                                    _onLogout();
                                }} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), right: getWidth(40)}}><Image source={images.okButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                            </View>
                        </Modal>
                    </View>)
            : null}

            {signoutModal? (
                  <View style={{position: "absolute", width: "100%", height: "100%", backgroundColor: theme.whiteBackground, opacity: 0.3}}>
                    <Modal visible={signoutModal} transparent={true}>
                        <View style={{position: "absolute", top: getHeight(260), left: getWidth(40), width: getWidth(280), height: getHeight(120), borderRadius: 12, backgroundColor: theme.whiteBackground, borderStyle: "solid",
                                      borderColor: theme.edgePink, borderWidth: 4, alignItems: "center", paddingTop: getHeight(13)}}>
                            <CountText> 회원탈퇴하시겠습니까?</CountText>
                            <TouchableOpacity onPress={() => setSignoutModal(pre => !pre)} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), left: getWidth(40)}}><Image source={images.cancelButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                    setSignoutModal(pre => !pre);
                                    _onDelete();
                            }} style={{width: getWidth(90), height: getHeight(30), position: "absolute", top: getHeight(73), right: getWidth(40)}}><Image source={images.okButton} style={{width: "100%", height: "100%"}}/></TouchableOpacity>
                        </View>
                    </Modal>
                  </View>)
            : null}



            </View>
          </ScrollView>
        </ImageBackground>
        )
};


export default Mypage;