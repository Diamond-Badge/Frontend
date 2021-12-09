import React, {memo} from 'react';
import { View } from 'react-native';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {getHeight, getWidth, getFontSize} from "../hooks/caculateSize";

const EmotionIcon = styled.Image`
  position: absolute;
  top: ${({top}) => getHeight(top)}px;
  left: ${({left}) => getWidth(left)}px;
  height: ${getHeight(43.3)}px;
  width: ${getWidth(42.5)}px;
`;

const EmotionRateText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${getFontSize(20)}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;


const EmotionRatio = ({iconImage, iconLeft, textLeft, ratioText}) => {
    return (
      <>
        <EmotionIcon source={iconImage} top={342} left={iconLeft} resizeMode="contain"/>
        <View style={{position: "absolute", width: getWidth(42.5), top: getHeight(386), left: getWidth(textLeft), alignItems: "center"}}><EmotionRateText>{ratioText}%</EmotionRateText></View>
      </>
    );
  };


EmotionRatio.propTypes = {
    iconImage: PropTypes.any.isRequired,
    iconLeft: PropTypes.number.isRequired,
    textLeft: PropTypes.number.isRequired,
    ratioText: PropTypes.number.isRequired
};


export default memo(EmotionRatio);