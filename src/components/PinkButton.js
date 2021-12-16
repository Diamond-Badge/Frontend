import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { theme } from '../theme';

const Container = styled.TouchableOpacity`
    background-color: ${({theme})=> theme.pinkbutton };
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 7px;
    opacity: ${({disabled}) => (disabled? 0.5 : 1)};
`;


const PinkButton = ({containerStyle, title, onPress, isFilled, disabled}) => {
    return (
        <Container 
        style={containerStyle} 
        onPress={onPress} 
        isFilled={isFilled} 
        disabled={disabled}>
            <Text isFilled={isFilled} style={styles.text}>{title}</Text>            
        </Container>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: "나눔손글씨 중학생",
        fontSize: 20,
    },
});

PinkButton.defaultProps ={
    isFilled: true,
};

PinkButton.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
    disabled: PropTypes.bool,
};


export default PinkButton; 