import React, {memo} from 'react';
import { View, Image, Text} from 'react-native';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {getHeight, getWidth, getFontSize} from "../hooks/caculateSize";
import {images} from "../images";

const MonthView = styled.View`
    top: ${getHeight(27)}px;
    align-items: center;
`;

const monthImage = (month) => {
    if(month==="11"){
        return (
            <Image source={images.NovDrawing} style={{width: getWidth(243), height: getHeight(160)}} resizeMode="stretch" />
        );
    }else{
        return (
            <Image source={images.JanDrawing} style={{width: getWidth(198.4), height: getHeight(167.8)}} resizeMode="stretch" />
        );
    }
   
};

const MonthDrawing = ({month}) => {

    return (
      <MonthView>
          {monthImage(month)}
      </MonthView>
    );
  };


MonthDrawing.propTypes = {
    // month: PropTypes.string.isRequired,
};


export default memo(MonthDrawing);