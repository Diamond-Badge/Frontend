import React from 'react';
import { Dimensions, Text, StyleSheet, View, Image} from 'react-native';
import PropTypes from "prop-types";
import styled, {ThemeContext} from "styled-components/native";
import {images} from "../images";
// import {getFontSize, getWidth, getHeight} from "../hooks/caculateSize";
import { ImageButton } from '.';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const DHeight = (HEIGHT*(1/760)).toFixed(2); 
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

const AskEmotion = ({containerStyle, onExcited, onHappy, onSad, onAngry, onDepressed}) => {
    return (
        <View style={containerStyle}>
            <Image source={images.emotionbubble} styles={styles.bubble} resizeMode="stretch" />
            <Text style={styles.text}>오늘 기분은 어땠나요?</Text>
            
            <ImageButton containerStyle={[styles.imgs,{left: getWidth(23.5)}]} 
            imgStyle={styles.img} onPress={onExcited} src={images.excited} />
            <ImageButton containerStyle={[styles.imgs,{left: getWidth(73.6)}]} 
            imgStyle={styles.img} onPress={onHappy} src={images.happy} />
            <ImageButton containerStyle={[styles.imgs,{left: getWidth(125)}]} 
            imgStyle={styles.img} onPress={onSad} src={images.sad} />
            <ImageButton containerStyle={[styles.imgs,{left: getWidth(174.9)}]}  
            imgStyle={styles.img} onPress={onAngry} src={images.angry} />
            <ImageButton containerStyle={[styles.imgs,{left: getWidth(226.2)}]} 
            imgStyle={styles.img} onPress={onDepressed} src={images.depressed} />
            
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "나눔손글씨 중학생",
        fontSize: 25,
        position:'absolute',
        bottom: getHeight(66),
        left: getWidth(83),
    },
    bubble: {
        position:'absolute',
        height: getHeight(128.5),
        width: getWidth(306),
    },
    img:{
        height: getHeight(43),
        width: getWidth(43),
    },
    imgs:{
        bottom: getHeight(16.8), 
        position:'absolute',
    }
});

AskEmotion.defaultProps ={
    isFilled: true,
};

AskEmotion.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
    disabled: PropTypes.bool,
};


export default AskEmotion;