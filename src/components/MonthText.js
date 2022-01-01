import React, {memo} from 'react';
import { View, Image, Text} from 'react-native';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {getHeight, getWidth, getFontSize} from "../hooks/caculateSize";
import {images} from "../images";

const MonthView = styled.View`
    position: absolute;
    z-index: 1; 
    top: ${getHeight(6)}px;
    left: ${getWidth(29)}px;
`;

const monthImage = (month) => {
    if(month==="11"){
        return images.NovText;
    }else{
        return images.JanText;
    }
   
};

const MonthText = ({month}) => {

    return (
      <MonthView>
          <Image source={monthImage(month)} resizeMode="contain" style={{
              width: getWidth(48),
              height: getHeight(82),
          }}/>
      </MonthView>
    );
  };


MonthText.propTypes = {
    month: PropTypes.string.isRequired,
};


export default memo(MonthText);