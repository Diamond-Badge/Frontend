import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, StyleSheet, Modal, View, Image, ImageBackground, Dimensions, TouchableOpacity} from 'react-native';
import { ImageButton, AskEmotion } from '../components';
import { theme } from '../theme';
import styled from "styled-components/native";
import { images } from '../images';
import {ProgressContext, BasicContext, UrlContext} from "../contexts";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const DHeight = (HEIGHT*(1/720)).toFixed(2); 
const DWidth = (WIDTH*(1/360)).toFixed(2);

export const getHeight = dp => {
    return DHeight*dp;
};

export const getWidth = dp => {
    return DWidth*dp;
};

export const getFontSize = sp => {
    return ((sp*HEIGHT)/760).toFixed(2);
};


var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
exports.moment = moment;


const TitleText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${({size}) => getFontSize(size)}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: ${({align}) => align ? align : 'center'};
`;  

const StyledImage = styled.Image`
    margin-top: 10px;
    width: ${getWidth(200)}px;
    height: ${getHeight(200)}px;
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

const Diary = ({navigation}) => {

    const {jwt} = useContext(BasicContext);
    const {spinner} = useContext(ProgressContext);
    const {url} = useContext(UrlContext);

    const [isLocation, setIsLocation] = useState(false);
    const [isBack, setIsBack] = useState(false);
    
    // 위치 등록 팝업
    const [isLocatioModal, setISLocationModal] = useState(false);
    const [isEmotionModal, setIsEmotionModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    // 위치
    const [latitude, setLatitude] = useState(0);
    const [longtitude, setLongtitude] = useState(0);
    const [location, setLocation] = useState("");

    // 타임라인
    const [diarys, setDiarys] = useState([]);
    const [emotion, setEmotion] = useState("DEFAULT");
    const [stickers, setStickers] = useState([]);
    const [timeLineSeq, setTimeLineSeq] = useState(0);


    // 현재 위치 등록 모달
    const _handleLocationModal = () => {setISLocationModal(true)};

    // 현재 위치 등록
    const _handleLocationPress = () => {};

    // 감정 등록 모달
    const _handleEmotionModal = () => {setIsEmotionModal(true)};

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

    useEffect(() => {
        getTimeLine();
        // 화면 새로고침(navigation 이동 후 돌아왔을 때 새로고침)
        const willFocusSubscription = navigation.addListener('focus', () => {
            getTimeLine();
        });

        return willFocusSubscription;
    },[])

    // 타임라인 불러오기
    const getTimeLine = async () => {
        let fixedUrl = url+"/api/v1/timeline?localDate="+date;
      
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Autorization': jwt,
            },
        };
        try{
          spinner.start();
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          if(res.success){
                setDiarys(res.data.diarys);
                setEmotion(res.data.emotionType);
                setStickers(res.data.stickers);
                setTimeLineSeq(res.data.timeLineSeq);
          }else{
            return "error";
          }
        }catch(e){
          console.log(e);
        }finally{
          spinner.stop();
        }
    };


    // 일기 쓰기 및 수정
    const _diaryChange = (id) => {
        navigation.navigate("DiaryWrite", {diaryId: id});
    };

    // 일기 삭제
    const _diaryDelete = async (num) => {
        let fixedUrl = url+"/api/v1/diary/"+num;
      
        let options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Autorization': jwt,
            },
        };

        try{
          spinner.start();
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          if(res.success){
                // 새로 다시 위치 불러오기
          }else{
            return "error";
          }
        }catch(e){
          console.log(e);
        }finally{
          spinner.stop();
        }
    };

    // 위치 등록
    const _locationAdd = async () => {
        let fixedUrl = url+"/api/v1/diary";
      
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Autorization': jwt,
            },
            body: JSON.stringify({
                latitude: latitude,
                location: location,
                longtitude: longtitude,
            }),
        };

        try{
          spinner.start();
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          if(res.success){
                // 새로 다시 위치 불러오기

          }else{
            return "error";
          }
        }catch(e){
          console.log(e);
        }finally{
          spinner.stop();
        }
    };

    // 감정 등록
    const _emotionadd = async (emotion) => {
        setEmotion(emotion);
        setIsEmotionModal(false);

        let fixedUrl = url+`/api/v1/timeline/${timeLineSeq}/emotion?emotionName=${emotion}`;
      
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Autorization': jwt,
            },
        };

        try{
          spinner.start();
          let response = await fetch(fixedUrl, options);
          let res = await response.json();
          if(res.success){

          }else{
            return "error";
          }
        }catch(e){
          console.log(e);
        }finally{
          spinner.stop();
        }
    };

    // 감정 아이콘 변동
    const _emotionchange = () => {
        if (emotion == 'DEFAULT'){
            return images.emotionadd
        }
        else if (emotion == 'EXCITED'){
            return images.excited
        }
        else if (emotion == 'HAPPY'){
            return images.happy
        }
        else if (emotion == 'SAD'){
            return images.sad
        }
        else if (emotion == 'ANGRY'){
            return images.angry
        }
        else if (emotion == 'DEPRESSED'){
            return images.depressed
        }
    }


    const DiarySet = ({diary: {diarySeq, content, diaryImages, place, createdAt}, onEdit, onDelete}) => {
        let diaryimg = diaryImages;
        let path = diaryimg.length!==0? diaryimg[0].path : "";
        return (
            <View>
                {/* 세로줄 */}
                <View style={{top: getHeight(34), left: getWidth(53), right: getWidth(233),}}>
                    <Image source={images.diaryicon} style={{width: getWidth(38), height: getHeight(32)}} resizeMode="stretch" />
                </View>
                {/* 시간 & 장소 */}
                <View style={{left: getWidth(11), top: getHeight(12)}}>
                    <TitleText size={16} align={'left'}>{createdAt}</TitleText>
                </View>
                <View style={{left: getWidth(98), bottom: getHeight(14) }}>
                    <TitleText size={25} align={'left'}>{place}</TitleText>
                </View>
                {/* 일기 내용 */}
                <View style={{left: getWidth(100),}}>
                    <TitleText size={16} align={'left'}>{content}</TitleText>
                </View>
                { diaryImages!="" && 
                diaryImages.map(item => <StyledImage key={item.diaryImagesSeq} source={{uri : item.path}} />)}
                {/* 일기 수정 */}
                <ImageButton containerStyle={{top: getHeight(35), position:'absolute', left: getWidth(268)}} 
                    imgStyle={{width: getWidth(14), height:getHeight(14)}} onPress={onEdit} src={images.diaryedit}/>
                {/* 일기 삭제 */}
                <ImageButton containerStyle={{top: getHeight(34.5), position:'absolute', left: getWidth(284)}} 
                    imgStyle={{width: getWidth(16), height:getHeight(16)}} onPress={onDelete} src={images.diarydelete}/>
                {/* 일기 삭제 모달 */}
                <Modal visible={isDeleteModal} transparent={true}>
                    <TouchableOpacity style={styles.background} onPress={() => setIsDeleteModal(false)} />
                    <ModalView>
                        <View style={{top: getHeight(27), }}>
                        <TitleText size={25}>정말 삭제하시겠습니까?</TitleText></View>
                        <TouchableOpacity style={[styles.button, styles.greybutton]} onPress={()=>{setIsDeleteModal(false);}}>
                             <TitleText size={20}>CANCEL</TitleText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.pinkbutton]} onPress={()=>{_diaryDelete(diarySeq);  setIsDeleteModal(false);}}>
                            <TitleText size={20}>OK</TitleText>
                        </TouchableOpacity>
                    </ModalView>
                    </Modal>
            </View>
        );
    };


    return (
        <ImageBackground source={images.background} style={{width: "100%", height: "100%"}} resizeMode="cover">
            <ScrollView>
                <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={styles.title}><TitleText size={30}>MY DIARY</TitleText></View>
                    <ImageButton containerStyle={styles.mapicon} imgStyle={{height: 29, width: 29,}}
                        onPress={_handleMapPress} src={images.mapversion}/>
                </View>
                {/* 날짜 */}
                <View>
                    <View style={{top: getHeight(80), left: getWidth(61), position:'absolute'}}>
                        <TitleText size={30}>{date.format('YYYY')+'년 '+_dateChange(date.format('MM'))+'월 '+_dateChange(date.format('DD'))+'일'}</TitleText>
                    </View>
                    <TouchableOpacity style={{top: getHeight(89), position:'absolute', left: getWidth(30)}} onPress={_prevDate}>
                        <TitleText size={20}>◀</TitleText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{top: getHeight(89), position:'absolute', left: getWidth(203)}} onPress={_nextDate}>
                        <TitleText size={20}>▶</TitleText>
                    </TouchableOpacity>
                    <View style={{top: getHeight(82), left: getWidth(303), width: getWidth(31), height: getHeight(31), position:'absolute'}}>
                        <TouchableOpacity onPress={_handleEmotionModal}>
                            <Image source={_emotionchange()}/>
                        </TouchableOpacity>
                        <Modal visible={isEmotionModal} transparent={true}>
                        <TouchableOpacity style={styles.background} onPress={() => setIsEmotionModal(false)} />
                        <AskEmotion containerStyle={{left: getWidth(40), top: getHeight(90), }}
                            onExcited={() => _emotionadd('EXCITED')} onHappy={() => _emotionadd('HAPPY')} onSad={() => _emotionadd('SAD')}
                            onAngry={() => _emotionadd('ANGRY')} onDepressed={() => _emotionadd('DEPRESSED')}/>
                    </Modal>
                    </View>
                </View>

                {diaries.length == 0 ? 
                <View style={{marginTop: getHeight(123), flex: 0 }}> 
                    <View style={{marginTop: getHeight(95), left: getWidth(75)}}>
                        <Image source={images.diaryaddfirst}/>
                    </View>
                    <View style={{marginTop: getHeight(42)}}>
                        <TitleText size={25}>아직 등록한 위치가 없습니다.</TitleText>
                    </View>
                    <View style={[styles.pinkbutton2, {marginTop: getHeight(9), left: getWidth(120)}]}>
                        <TouchableOpacity style={styles.pinkbutton2} onPress={_handleLocationModal}>
                            <TitleText size={20}>현재 위치 등록하기</TitleText>
                        </TouchableOpacity>
                    </View>
                </View>
                :     
                <View style={styles.diaryborder}>
                    <View style={styles.add}/>
                    {diaries.map(item => 
                        <DiarySet key = {item.diarySeq} diary={item} onEdit={()=> _diaryChange(item.diarySeq)} onDelete={()=> setIsDeleteModal(true)}/>)
                    }        

                    {/* 위치 등록 모달 */}
                    <TouchableOpacity onPress={_handleLocationModal}
                        style={{ left: getWidth(45), marginTop: getHeight(10),}}>
                        <Image source={images.placeadd} style={{width: getWidth(54), height:getHeight(54)}}/>
                    </TouchableOpacity>
                    <View style={{  left: getWidth(105), bottom: getHeight(40)}}>
                        <TitleText size={25} align={'left'}>위치등록</TitleText>
                    </View>
                </View>
                }
                
                <Modal visible={isLocatioModal} transparent={true}>
                        <TouchableOpacity style={styles.background} onPress={() => setISLocationModal(false)} />
                        <ModalView>
                            <View style={{top: getHeight(27), }}>
                            <TitleText size={25}>위치를 등록하시겠습니까?</TitleText></View>
                            <TouchableOpacity style={[styles.button, styles.greybutton]} onPress={()=>{setISLocationModal(false);}}>
                                <TitleText size={20}>CANCEL</TitleText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.pinkbutton]} onPress={() => {_locationAdd(); setISLocationModal(false); }}>
                                <TitleText size={20}>OK</TitleText>
                            </TouchableOpacity>
                        </ModalView>
                    </Modal>
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
    pinkbutton2:{
        width: getWidth(120),
        height: getHeight(40),
        borderRadius: 7,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor: theme.pinkTheme,
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
    pinkbutton:{
        right: getWidth(40),
        backgroundColor: theme.pinkbutton,
    },
    greybutton:{
        left: getWidth(40),
        backgroundColor: theme.greybutton,
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
    },
    add:{
        position:'absolute',
        width: getWidth(10),
        borderRadius: 10,
        backgroundColor: theme.diaryadd,
        top: getHeight(20),
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
});

const diaries = [
    {
        diarySeq: 1,
        content: "시험기간이라 학교에 일찍 왔다ㅠ", 
        diaryImages: [{diaryImagesSeq:0, path: ""}], 
        place: "덕성아주대학교" , 
        createdAt: "09:40AM",
    },
    {
        diarySeq: 2,
        content: "배고파서 단백질 충전!!", 
        diaryImages: "", 
        place: "고깃집" , 
        createdAt: "11:40AM",
    },
    {
        diarySeq: 3,
        content: "민트초코 맛있다", 
        diaryImages: "", 
        place: "카페" , 
        createdAt: "03:40PM",
    },
];



export default Diary; 