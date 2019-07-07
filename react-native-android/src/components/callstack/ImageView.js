import React from 'react';
import {Text,View,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native';


const popAction = StackActions.pop({
    n:1
});


export default class ImageView extends React.Component{
    render(){

        const src = this.props.navigation.getParam('src','');
        console.log(src);

        return(
            <View style={{flex:1,backgroundColor:'#333'}}>
                <TouchableOpacity syle={{flex:1,margin:20}} onPress={()=>this.props.navigation.dispatch(popAction)}>
                    <Icon name='ios-close' size={30} color='#bbb'/>
                </TouchableOpacity>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image source={src} resizeMode='cover'/>
                </View>
            </View>
        )
    }
}