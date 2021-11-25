import {Dimensions} from "react-native";

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

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

