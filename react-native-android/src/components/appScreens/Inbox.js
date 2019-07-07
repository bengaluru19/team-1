import React from 'react';
import {View,Text,TouchableOpacity,SafeAreaView,TextInput,Image,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



class Inbox extends React.Component{
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1}}>
                   
                    <View style={{height:80,elevation:5,backgroundColor:'white',borderBottomWidth:1,borderBottomColor:'#dddddd',flexDirection:'row',alignItems:'center',paddingLeft:20}}>
                    <View style={{flex:1,alignItems:"flex-start",justifyContent:'center'}}>
                        <Image source={require('../images/user.png')} 
                            style={{borderRadius:25,width:50,height:50,borderWidth:1,borderColor:'white'}}
                        />
                    </View>
                        <View style={{
                            flex:6,
                            flexDirection:'row',
                            paddingLeft:10,
                            marginTop:10,
                            borderRadius:5,
                            backgroundColor:'white',
                            marginHorizontal:20,
                            alignItems:'center',
                            elevation:2,
                            marginRight:30,
                            borderColor:'#000'}}>
                            <Icon name="ios-search" size={20} style={{marginRight:10}}/>
                            <TextInput placeholder="Search Users" placeholderTextColor="grey" style={{flex:1,fontWeight:'700',backgroundColor:'white'}}/>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export {Inbox};