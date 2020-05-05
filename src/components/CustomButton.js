import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default CustomButton = props => {
    var mode = props.mode != null ? props.mode : 0;

    let baseStyle = styles.base;
    let textStyle = styles.text;

    if (mode == "1")
        textStyle = styles.text1;
    else if (mode == "2")
        textStyle = styles.text2;

    return <TouchableOpacity style={baseStyle} onPress={props.onTap}>
        <Text style={textStyle}>{props.text}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 26,
        fontWeight: "900"
    },
    text1: {
        color: '#9E9E9E',
        fontSize: 26,
        fontWeight: "900"
    },
    text2: {
        color: '#FF7043',
        fontSize: 26,
        fontWeight: "900"
    }
})