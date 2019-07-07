import React from 'react';
import {Text,View} from 'react-native';


const Calloutcomp=({title,date,from,to,interest})=>{
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontFamily:'roboto',fontWeight:'700',fontSize:20}}>{title}</Text>
                                    <Text>{date}</Text>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <Text style={{paddingRight:10}}>{from}</Text>
                                        <Text style={{paddingLeft:10}}>{to}</Text>
                                    </View>
                                    <Text>{interest}</Text>
        </View>
    )
};

export default Calloutcomp;