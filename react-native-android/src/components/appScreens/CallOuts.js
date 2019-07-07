import React from 'react';
import {View,Text,TouchableOpacity,SafeAreaView,TextInput,ScrollView,Image,StatusBar,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './common/Card';
import PTRView from 'react-native-pull-to-refresh'
import CallOutComp from './common/Calloutcomp';
import MapView ,{PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import axios from 'axios';
import {connect} from 'react-redux';
import {randomReducer} from '../../actions/AuthActions'





class CallOuts extends React.Component{

    state={
        curLocation:{
            latitude:0,
            longitude:0
        },
        userid:'',
        events://[{name:'Arjun',description:'asld',location:{lat:12.97616,lng:77.5946},from:"time",_id:"12345"}]
        [],
        
    }


    onRefresh=()=>{
        return new Promise((resolve) => {
            this.forceUpdate();
            setTimeout(()=>{resolve()}, 2000)
        });
    }

    componentDidMount=()=>{
        this.setState({userid:this.props.auth.userid});
        console.log(this.state);
        axios.post('http://192.168.43.169:5000/getEvents')
        .then(events=>{this.setState({events:events.data})})
        .catch(err=>{alert("Err");})
    }

    showEventDetails=(details)=>{
        this.props.navigation.navigate('Announcement',{details:details,userid:this.state.userid});
    }

    

    onMapIsReady=()=>{
        navigator.geolocation.watchPosition((position)=>{
            
        })
    }

    sendEventDetails=(id)=>{
            axios.post('http://192.168.43.169:5000/getEventDetails',{
                _id:id
            })
            .then(eventDetail=>{this.showEventDetails(eventDetail)})
            .catch(err=>alert(err))

    }


    locationExists=()=>{
        const MapWithEvent = this.state.events.map(event=>{
            return(
                <Marker
                    onPress={()=>{this.sendEventDetails(event._id)}}                   //onPress={()=>alert('Pressed!')}
                    key={event._id}
                    title="Event title"
                    description="This is a random desc"
                    pinColor="red"
                    coordinate={{
                        latitude:event.location.lat,
                        longitude:event.location.lng
                    }}
                    >
                    <Callout>
                        <CallOutComp  title={event.name} date="date" from="start" to="end" interest="interest"/>
                    </Callout>
                </Marker>
            )
        });
        return MapWithEvent;
    }


    render(){
        
        console.log(this.state);
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'rgba(0,0,0,0)'}}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
                <View style={{flex:1}}>
                    <View style={{height:80,elevation:5,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#dddddd',flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity style={{backgroundColor:'#fff'}} onPress={()=>this.props.navigation.toggleDrawer()}>
                            <Icon name="ios-menu" size={30} style={{marginLeft:20,marginTop:10}}/>
                        </TouchableOpacity>
                        <View style={{
                        flexDirection:'row',
                        paddingLeft:10,
                        marginTop:10,
                        borderRadius:5,
                        backgroundColor:'white',
                        marginHorizontal:20,
                        alignItems:'center',
                        elevation:2,
                        marginRight:65,
                        borderColor:'#000'}}>
                        <Icon name="ios-search" size={20} style={{marginRight:10}}/>
                        <TextInput placeholder="Search Events" placeholderTextColor="grey" style={{flex:1,fontWeight:'700',backgroundColor:'white'}}/>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Announcement')}} style={{flex:1,alignItems:'flex-end',marginRight:20}}>
                            <Icon name="ios-funnel" size={20} style={{marginRight:10}}/>
                            <Text style={{color:'#000'}}>Filter</Text>
                        </TouchableOpacity>
                    </View>
                        
                        
                </View>
                <View style={{flex:1}}>
                    {
                        this.state.events.length?
                        <MapView
                            //provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={{
                                latitude: 12.9716,
                                longitude: 77.5946,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                                }}
                        showsMyLocationButton
                        showsUserLocation
                            showsCompass
                            zoomEnabled={true}
                        >
                            {
                                this.locationExists()
                            }
                        </MapView>:
                        <View>
                            <Text>No Events found near you!</Text>
                        </View>
                    }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

/*const styles={
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
}*/
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      //...StyleSheet.absoluteFillObject,
      left:0,
      right:0,
      top:0,
      bottom:0,
      position:'absolute'
    },
   });

/*{
    <PTRView onRefresh={this.onRefresh} >
                        <Card navigation={this.props.navigation}    src={require('../images/user.png')}/>
                        <Card navigation={this.props.navigation}    src={require('../images/book2.png')}/>
                        <Card navigation={this.props.navigation}    src={require('../images/book3.png')}/>
                        <Card navigation={this.props.navigation}    src={require('../images/book4.png')}/>
                        <Card navigation={this.props.navigation}   />
                        <Card navigation={this.props.navigation}   />
                    </PTRView>
}*/

//<TextInput placeholder="Make an announcement" placeholderTextColor="grey" style={{flex:1,fontWeight:'700',backgroundColor:'white'}}/>
/*{
    <TouchableOpacity 
                            onPress={()=>this.props.navigation.navigate('Announcement')}
                            style={{justifyContent:'center',flexDirection:'row',paddingLeft:10,marginTop:10,borderRadius:5,backgroundColor:'white',marginHorizontal:20,alignItems:'center',elevation:2,marginRight:60,borderColor:'#000'}}>
                            
                                <Icon name="ios-create" size={20} style={{marginRight:10}}/>
                                <Text style={{height:30,alignSelf:'center',flex:1,fontWeight:'700',backgroundColor:'white',marginTop:14}}>Make an announcement</Text>
                        
                        </TouchableOpacity>
}*/



/*{
    <Marker
                            //onPress={()=>alert('Pressed!')}
                            title="Event title"
                            description="This is a random desc"
                            pinColor="red"
                            coordinate={{
                                latitude: 12.97616,
                                longitude: 77.5946
                            }}
                        >
                            <Callout>
                                <CallOutComp/>
                            </Callout>
                        </Marker>
                        <Marker
                        //onPress={()=>alert('Pressed!')}
                            title="Event title"
                            description="This is a random desc"
                            pinColor="red"
                            coordinate={{
                                latitude: 12.9516,
                            longitude: 77.5946
                            }}
                        >
                            <Callout>
                                <CallOutComp/>
                            </Callout>
                        </Marker>
                        <Marker
                        //onPress={()=>alert('Pressed!')}
                            title="Event title"
                            description="This is a random desc"
                            pinColor="red"
                            coordinate={{
                                latitude: 12.9416,
                                longitude: 77.5946
                            }}
                        >
                            <Callout>
                                <CallOutComp/>
                            </Callout>
                        </Marker>
}*/
const mapStateToProps=(state)=>{
    const {auth} = state;
    return {auth};
}

export default connect(mapStateToProps,{randomReducer}) (CallOuts);