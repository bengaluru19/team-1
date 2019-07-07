import React from 'react';
import {View,Text,TouchableOpacity,SafeAreaView,TextInput,Image,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Settings extends React.Component{

    static navigationOptions={
        title:'Settings'
    }

    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                 
                <View style={{flex:1}}>
                    <View style={{height:80,backgroundColor:'white',borderBottomWidth:1,borderBottomColor:'#dddddd',flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.toggleDrawer()}>
                            <Icon name="ios-menu" size={30} style={{marginLeft:20,marginTop:10}}/>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',paddingLeft:10,marginTop:10,backgroundColor:'white',marginHorizontal:20,alignSelf:'center',felx:1}}>
                            <Text style={{fontSize:24,fontFamily:'roboto',fontWeight:'700',textAlign:'center'}}>Settings</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}