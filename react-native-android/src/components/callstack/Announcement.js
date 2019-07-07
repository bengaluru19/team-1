import React from 'react';
import {Text,View,TouchableOpacity,Image,Button,Platform,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { Picker } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios'

const popAction=StackActions.pop({
    n:1
});



export default class Announcement extends React.Component{
    
    state={
        details:{},
        userId:''
    }

    onSubjectChange=(text)=>{
        this.setState({subject:text});
    }

    onBodyChange=(text)=>{
        this.setState({body:text});
    }


    handleImagePress=()=>{
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
              skipBackup: true
            },
          };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              let source = {uri:response.uri};
              this.setState({
                photo: source
              });
            }
          });
    }
    componentWillMount=()=>{
        const details = this.props.navigation.getParam('details',{});
        const userId = this.props.navigation.getParam('userid','');
        this.setState({details:details.data,userId:userId});
    }

    onPress=()=>{
        alert('Ahhhh');
    }

    registerForEvent=()=>{
        axios.post('http://192.168.43.169:5000/registerEvent',{
            eventId:this.state.details._id,
            volunteerId:this.state.userId
        })
        .then(resp=>{alert(resp.data);this.props.navigation.dispatch(popAction)})
        .catch(err=>alert('Already registered!'))
    }
    
    
    render(){
        const lat=this.state.details.location.lat;
        const lng=this.state.details.location.lng;

        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        });
        return(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>this.props.navigation.dispatch(popAction)} style={{flex:1,padding:10}}>
                    <Icon name="ios-close" size={30}/>
                </TouchableOpacity>
                <View style={{flex:4,padding:20}}>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'center',fontFamily:'roboto',fontSize:30,fontWeight:'500'}}>{this.state.details.name}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontFamily:'roboto',fontSize:20,fontWeight:'500'}}>Description</Text>
                        <Text>{this.state.details.description}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Text style={{fontFamily:'roboto',fontSize:20,fontWeight:'500'}}>Skills required</Text>
                        <Text>Skill list</Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-start'}}>
                        <Text style={{fontFamily:'roboto',fontSize:20,fontWeight:'500'}}>Location</Text>
                        <TouchableOpacity style={{alignItems:'center',alignSelf:'center',paddingTop:10}} width={100} height={100} onPress={()=>Linking.openURL(url)}>
                            <Image style={{alignSelf:'center'}} source={require('../images/gmap.png')} height={100} width={100} resizeMode='contain'/>
                        </TouchableOpacity>
                    </View>
                    <Button onPress={this.registerForEvent} style={{flex:1}}  title="Register"/>
                </View>
            </View>
        )
    }
}

const styles={
    buttonStyle:{
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: '#007aff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        margin:30,
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

/*{
    <View style={{flex:1}}>
    <TouchableOpacity onPress={()=>this.props.navigation.dispatch(popAction)} style={{flex:1,padding:10}}>
        <Icon name="ios-close" size={30}/>
    </TouchableOpacity>
</View>
<View style={{flex:5}}>
    <Text style={{textAlign:'center',fontFamily:'roboto',fontSize:24,fontWeight:'500'}}>Make Announcement</Text>
    <View style={{margin:30,padding:10,flex:1,elevation:1,borderBottomWidth:1,borderBottomColor:'#ddd'}}>
        <View style={{borderBottomWidth:1,borderColor:'#ddd'}}>
            <TextInput value={this.state.subject} onChangeText={this.onSubjectChange} placeholder="Subject"/>
        </View>
        <View style={{flex:4,borderBottomWidth:1,borderColor:'#ddd'}}>
            <View style={{flex:2}}>
            <TextInput onChangeText={this.onBodyChange} placeholder="Body" multiline/>
            </View>
            <View style={{alignSelf:'flex-end'}}>
                <Text>{this.state.body.length}</Text>
            </View>
        </View>
        <View style={{flex:1}}>
            <Picker>
                <Picker.Item label="Class 1" value="Class 1"/>
                <Picker.Item label="Class 2" value="Class 2"/>
                <Picker.Item label="Class 3" value="Class 3"/>
                <Picker.Item label="Class 4" value="Class 4"/>
            </Picker>
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
            <View>
            {this.state.photo?
                
                    <Image source={this.state.photo} style={{width:50,height:50}}/>
                
                :
                <View></View>
            }
            </View>
            <View style={{flex:1,paddingTop:10}}>
                <TouchableOpacity onPress={this.handleImagePress} style={{flexDirection:'row',paddingHorizontal:10}}>
                    <Icon name="ios-attach" size={24}/>
                    <Text style={{paddingLeft:10}}>Attach image</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={styles.buttonStyle}>
            <Text style={{color:'white'}}>Announce</Text>
        </TouchableOpacity>
    </View>
</View>
}*/

/*{
    <View style={{flex:1}}>
                <TouchableOpacity onPress={()=>this.props.navigation.dispatch(popAction)} style={{flex:1,padding:10}}>
                    <Icon name="ios-close" size={30}/>
                </TouchableOpacity>
                <Text style={{textAlign:'center',fontFamily:'roboto',fontSize:24,fontWeight:'500',flex:1}}>{this.state.details.name}</Text>
                <View styel={{flex:1}}>
                    <Text>Description</Text>
                    <Text>{this.state.details.description}</Text>
                </View>
                <View style={{flex:1}}>
                    <Text>From</Text>
                    <Text>To</Text>
                </View>
                <View style={{flex:1}}>
                    <Text>Skills you have among these</Text>
                    <Text>Skill list</Text>
                </View>
                <View>

                </View>
                <TouchableOpacity style={styles.buttonStyle} onPress={this.onPress}>
                    <Text style={styles.textStyle}>Register</Text>
                </TouchableOpacity>

            </View>
}*/