import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import styled from "styled-components/native";
import {getFontSize, getWidth, getHeight} from "../../hooks/caculateSize";
import {BasicContext, ProgressContext, UrlContext} from "../../contexts";


const PressButton = styled.TouchableOpacity`
  position: absolute;
  top: ${getHeight(410)}px;
  left: ${getWidth(150)}px;
  width: ${getWidth(60)}px;
  height: ${getHeight(30)}px;
  border-radius: 15;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.pinkTheme}
`;

const PressText = styled.Text`
font-family: '나눔손글씨 중학생';
font-size: ${getFontSize(20)}px;
font-style: normal;
letter-spacing: 0;
text-align: center;
color: ${({theme}) => theme.blackText};
`;  

const TitleCon = styled.View`
  position: absolute;
  top: ${getHeight(266)}px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-family: '나눔손글씨 중학생';
  font-size: ${getFontSize(30)}px;
  font-style: normal;
  letter-spacing: 0;
  text-align: center;
  color: ${({theme}) => theme.blackText};
`;  

const InputCon = styled.View`
  position: absolute;
  top: ${getHeight(350)}px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  width: ${getWidth(260)}px;
  height:${getHeight(30)}px;
  border-radius: 15;
  border-style: solid;
  border-width: 2;
  border-color: ${({theme}) => theme.pinkTheme}
  padding: ${getHeight(5)}px ${getWidth(30)}px;
  font-family: '나눔손글씨 중학생';
  font-size: ${getFontSize(20)}px;
  text-align: center;
`;

const NickName = ({navigation}) => {
    const [name, setName] = useState("");
    const {setLoginSuccess, setNickName, jwt} = useContext(BasicContext);
    const {spinner} = useContext(ProgressContext);
    const {url} = useContext(UrlContext);

    const FetchNick = async (nickName) => {
      let fixedUrl = url+"/api/v1/user/name?userName="+nickName;
    

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
         setLoginSuccess(true);
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

    const _onPress = async () => {
        setNickName(name);
        await FetchNick(name);
      };

  return(
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <TitleCon>
        <TitleText>닉네임을 입력해주세요</TitleText>  
      </TitleCon>
      <InputCon>
        <StyledInput 
        value={name}
        onChangeText={(text) => setName(t=> text)}
        onSubmitEditing={() => _onPress()}
        placeholder="닉네임 입력"
        returnKeyType="done"
        />
      </InputCon>
      <PressButton onPress={_onPress}>
        <PressText>입력</PressText>
      </PressButton>
    </View>
  );
};

export default NickName;