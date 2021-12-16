import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { theme } from '../theme';


const ImageButton = ({containerStyle, onPress, isFilled, disabled, src, imgStyle}) => {
    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={onPress}
            isFilled={isFilled} 
            disabled={disabled}>
            <Image source ={src} style={imgStyle} resizeMode="stretch"/>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    
});

ImageButton.defaultProps ={
    isFilled: true,
};

ImageButton.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
    disabled: PropTypes.bool,
    src: PropTypes.number,
    imgStyle: PropTypes.object,
};


export default ImageButton;