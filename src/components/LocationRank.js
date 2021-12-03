import React, {memo} from 'react';
import { View, Image } from 'react-native';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {getHeight, getWidth, getFontSize} from "../hooks/caculateSize";

const AccountText = styled.Text`
    font-family: '나눔손글씨 중학생';
    font-size: ${({size}) => getFontSize(size)}px;
    font-style: normal;
    letter-spacing: 0;
    text-align: left;
    color: ${({theme}) => theme.blackText};
`;

const LocationRank = ({iconTop, iconImage, iconText, locationText, locationTop}) => {
    return (
      <>
        <View style={{position: "absolute", top: getHeight(iconTop), left: getWidth(60), justifyContent: 'center', alignItems: 'center'}}>
          <Image source={iconImage} style={{position: "relative",width: getWidth(30), height: getHeight(30)}} resizeMode="contain"/>
          <AccountText size={25} style={{position: "absolute"}}>{iconText}</AccountText>
        </View>
        <AccountText size={20} style={{position: "absolute", top: getHeight(locationTop), left: getWidth(100)}}>{locationText}</AccountText>
      </>
    );
  };

LocationRank.propTypes = {
    iconTop: PropTypes.number.isRequired,
    iconImage: PropTypes.any.isRequired,
    iconText: PropTypes.string.isRequired,
    locationText: PropTypes.string.isRequired,
    locationTop: PropTypes.number.isRequired,
};

export default memo(LocationRank);

