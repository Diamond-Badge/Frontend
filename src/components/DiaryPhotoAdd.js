import React, {useState, } from 'react';
import { StyleSheet,  View, Image, Dimensions, TouchableOpacity} from 'react-native';
import styled from "styled-components/native";
import {getFontSize, getWidth, getHeight} from "../hooks/caculateSize";
import { images } from '../images';
import PropTypes from "prop-types";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const WIDTH = Dimensions.get("screen").width;

const Container = styled.View`
  flex-direction: column;
  width: 100%;  
`;

const StyledImage = styled.Image`
  margin-top: 10px;
  width: ${getWidth(200)}px;
  height: ${getHeight(200)}px;
`;

const DiaryPhotoAdd = ({ containerStyle, onChangeImage, disabled  }) => {
  const [height, setHeight] = useState(0);
  
  const addImage = async () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel) {
        onChangeImage(response.assets[0].uri);
      }

  });
  }

  return (
    <View style={containerStyle}>
        { !disabled &&
        <TouchableOpacity style={styles.imges} onPress={addImage} >
        <Image source={images.placeadd} style={styles.plus}/>
        </TouchableOpacity>}
        {/* {photo != null  && <StyledImage source={{ uri: photo}} height={height}/>} */}
    </View>
    

  );
};
DiaryPhotoAdd.defaultProps = {
    disabled: false,
    onChangeImage: () => {},
};

DiaryPhotoAdd.propTypes = {

};

const styles = StyleSheet.create({
    imges : {
        width: getWidth(200),
        height: getHeight(100),
        backgroundColor: 'white',
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#eec5c2",
        marginTop: getHeight(7),
    },
    plus : {
      position: 'absolute',
      top: getWidth(37),
      left: getHeight(86),
      width: getWidth(27), 
      height:getHeight(27)
    }
});

export default DiaryPhotoAdd;
