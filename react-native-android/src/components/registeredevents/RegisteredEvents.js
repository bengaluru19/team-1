import React from 'react';
import {Text,View,SafeAreaView} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import Card from '../appScreens/common/Card';
import {connect} from 'react-redux';
import {randomReducer} from '../../actions'
import axios from 'axios';

class RegisteredEvents extends React.Component{

    state={
        events:[]
    }

    componentWillMount=()=>{
        console.log(this.props.userid);
        axios.post('http://192.168.43.169:5000/getEventsOfVolunteer',{
            volunteerId:this.props.userid
        })
        .then(eventids =>{
            var arr=[];
            console.log(eventids);
            eventids.data.forEach(eventid=>{
                console.log(eventid);
                axios.post('http://192.168.43.169:5000/getEventDetails',{
                    _id:eventid.eventId
                })
                .then(details=>arr.push(details.data))
                .catch(err=>console.log(err))
            })
            this.setState({events:arr});
            this.onRefresh();
        })
        .catch(err=>console.log(err));
    }

    onRefresh=()=>{
        return new Promise((resolve) => {
            this.forceUpdate();
            this.renderCards(this.props.navigation)
            setTimeout(()=>{resolve()}, 2000)
        });
    }
    

    renderCards=(navigation)=>{
        if(this.state.events.length){
            const cardl = this.state.events.map(event=>{
                //var stl="";

                return(
                    <Card
                        key={event._id} 
                        name={event.name}
                        lat={event.location.lat}
                        lng ={event.location.lng}
                        date={event.data} 
                        desc={event.description}  
                        navigation={navigation} 
                        src={require('../images/user.png')}/>
                )
            })
            return cardl;
        }
        else{
            return(
                <View>
                    <Text>No Events Registered</Text>
                </View>
            );
        }
    }



    render(){

        console.log(this.state.events);
        


        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1}}>
                    <View style={{height:80,elevation:5,backgroundColor:'white',borderBottomWidth:1,borderBottomColor:'#dddddd',flexDirection:'row',alignItems:'center'}}>
                        <View style={{flexDirection:'row',paddingLeft:10,marginTop:10,backgroundColor:'116466',marginHorizontal:20,alignSelf:'center',felx:1}}>
                            <Text style={{fontSize:24,fontFamily:'roboto',fontWeight:'700',textAlign:'center'}}>Registered Events</Text>
                        </View>
                    </View>
                    <PTRView onRefresh={this.onRefresh} >
                        {
                            this.renderCards(this.props.navigation)
                        }
                    </PTRView>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps=(state)=>{
    const {userid} = state.auth;
    return {userid};
}

export default connect(mapStateToProps,{randomReducer})(RegisteredEvents);

/*{
    <Card navigation={this.props.navigation}    src={require('../images/user.png')}/>
                        <Card navigation={this.props.navigation}    src={require('../images/book2.png')}/>
                        <Card navigation={this.props.navigation}    src={require('../images/book3.png')}/>
                        <Card navigation={this.props.navigation}    src={require('../images/book4.png')}/>
                        <Card approved={true} navigation={this.props.navigation}   />
                        <Card navigation={this.props.navigation}   />
}*/