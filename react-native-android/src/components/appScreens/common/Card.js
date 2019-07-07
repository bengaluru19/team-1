import React from 'react';
import {View,Text,Image,Platform,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ViewMoreText from 'react-native-view-more-text';


class Card extends React.Component{

    

    onViewMore=(onPress)=>{
        return(
            <Text onPress={onPress}>View more</Text>
          )
    }

    onRenderViewLess=(onPress)=>{
        <Text onPress={onPress}>View less</Text>
    }


    render(){
        console.log(this.props);
        const lat=this.props.lat;
        const lng=this.props.lng;
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        });
        return(
            <View style={{flex:1,elevation:2,borderRadius:3,backgroundColor:'white',borderBottomWidth:0,borderColor:'#ddd',margin:10,marginHorizontal:20,justifyContent:'center'}}>
                <View style={{flex:1,flexDirection:'row',alignContent:'flex-start',padding:10,borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                    
                    
                    <View style={{flex:1,alignItems:'flex-start'}}>
                        <Text style={{color:'#000',fontSize:12,fontFamily:'roboto',fontWeight:'700'}}>{this.props.date}</Text>
                    </View>

                    <View style={{flex:2,alignItems:'center'}}>
                        <Text style={{color:'#000',fontSize:15,fontFamily:'roboto',fontWeight:'700'}}>{this.props.name}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Icon color={this.props.approved?"#116466":"red"} name={this.props.approved?"ios-checkmark":"ios-alert"} size={20}/>
                            <Text style={{color:this.props.approved?'#116466':'red',paddingLeft:10}}>{this.props.approved?'Approved':'Pending'}</Text> 
                    </View>
                    
                     
                </View>
                <View style={{flex:2,padding:10}}>
                <ViewMoreText
                    numberOfLines={3}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    textStyle={{textAlign: 'center'}}
                    >
                    <Text>
                        
                        {`${this.props.desc} Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.Lorem ipsum dolor sit amet, in quo dolorum ponderum, nam veri molestie constituto eu. Eum enim tantas sadipscing ne, ut omnes malorum nostrum cum. Errem populo qui ne, ea ipsum antiopam definitionem eos.`}
                    </Text>
                </ViewMoreText>
                        <TouchableOpacity style={{paddingTop:30}} width={100} height={100} onPress={()=>Linking.openURL(url)}>
                            <Image style={{alignSelf:'center'}} source={require('../../images/gmap.png')} height={100} width={100} resizeMode='contain'/>
                        </TouchableOpacity>
                </View>
                    
                    <TouchableOpacity style={{flex:1,flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:10,alignItems:'center',justifyContent:'center'}}>
                            <Icon color="red" name="ios-close" size={25}/>
                            <Text style={{color:'red',paddingLeft:10}}>Cancel</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

export default Card;

/*{
    <TouchableOpacity style={{flex:1,flexDirection:'row',borderWidth:1,borderColor:'#ddd',padding:10,alignItems:"center",justifyContent:'center'}}>
                            <Icon color="#116466" name={this.props.approved?"ios-checkmark":"ios-alert"} size={25}/>
                            <Text style={{color:'#116466',paddingLeft:10}}>{this.props.approved?'Approved':'Pending'}</Text> 
                    </TouchableOpacity>
}*/