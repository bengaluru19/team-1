import React from 'react';
import {Text,TouchableOpacity,Linking} from 'react-native';


const Button =(props)=>{
    return(
        <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
            <Text style={styles.textStyle}>{props.children}</Text>
        </TouchableOpacity>
    );
}



const styles={
    buttonStyle:{
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: '#007aff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff'
    },
    textStyle:{
        alignSelf:'center',
        color:'#fff',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10
    }
}

export {Button};