import React from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import {StackActions} from 'react-navigation';
import axios from 'axios';

const popAction = StackActions.pop({
    n:1
});

class SignUp extends React.Component{

    state={
        name:'',
        email:'',
        phone:'',
        org:'',
        password:'',
        confirm:'',
    }

    static navigationOptions={
        header:null
    }

    onNameChange=(text)=>{
        this.setState({name:text});
    }

    onEmailChange=(text)=>{
        this.setState({email:text});
    }

    onPhoneChange=(number)=>{
        this.setState({phone:number});
    }

    onOrgChange=(text)=>{
        this.setState({org:text});
    }
    onPasswordChange=(text)=>{
        this.setState({password:text});
    }
    onConfirmChange=(text)=>{
        this.setState({confirm:text});
    }

    onSubmit=()=>{
        axios.post('http://192.168.43.169:5000/createVolunteer',
        {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            organization:this.state.org,
            phone:this.state.phone
        })
        .then(id=>this.props.navigation.dispatch(popAction))
        .catch(err=>alert(err));
    }


    render(){
        return(
            <View style={{flex:1,alignItems:'center'}}>
                <Text style={{marginTop:50,textAlign:'center',fontFamily:'roboto',fontSize:24,fontWeight:'500'}}>Sign Up</Text>
                <View style={styles.formStyle}>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.name}
                                onChangeText={this.onNameChange} 
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Name"
                                placeholderTextColor = "#aaa"
                                selectionColor="#ddd"
                                returnKeyType="next"
                                onFocus={()=>this.setState({borderWidth:1,backgroundColor:'#e8a87c'})}
                                //onSubmitEditing={()=> this.password.focus()}
                                />
                        </View>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.email} 
                                onChangeText={this.onEmailChange}
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Email"
                                secureTextEntry={true}
                                placeholderTextColor = "#aaa"
                                returnKeyType="done"
                                keyboardType="email-address"
                                //ref={(input) => this.password = input}
                                />
                        </View>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.org}
                                onChangeText={this.onOrgChange} 
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Organization"
                                placeholderTextColor = "#aaa"
                                selectionColor="#ddd"
                                returnKeyType="next"
                                onFocus={()=>this.setState({borderWidth:1,backgroundColor:'#e8a87c'})}
                                //onSubmitEditing={()=> this.password.focus()}
                                />
                        </View>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.phone} 
                                onChangeText={this.onPhoneChange}
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Phone"
                                placeholderTextColor = "#aaa"
                                returnKeyType="done"
                                keyboardType="numeric"
                                //ref={(input) => this.password = input}
                                />
                        </View>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.password} 
                                onChangeText={this.onPasswordChange}
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Password"
                                placeholderTextColor = "#aaa"
                                secureTextEntry={true}
                                returnKeyType="done"
                                //ref={(input) => this.password = input}
                                />
                        </View>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.confirm} 
                                onChangeText={this.onConfirmChange}
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Confirm-Password"
                                secureTextEntry={true}
                                placeholderTextColor = "#aaa"
                                returnKeyType="done"
                                //ref={(input) => this.password = input}
                                />
                        </View>
                        <View style={{marginTop:20}}>
                        <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>    
                        <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(popAction);}} style={{alignItems:'center'}}>
                            <Text>Signin?</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
            </View>
        );
    }
}

export default SignUp;

const styles={
    container:{
        flex:1,
        flexGrow:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    logoStyle:{
        flex:2,
        alignItems:'center',
        justifyContent:'center'
    },
    formStyle:{
        flex:1,
        position:'relative',
        marginBottom:20,
        marginTop:20
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    },
    inputStyle:{
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10  ,
        borderBottomWidth:1
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
         borderRadius: 25,
          marginVertical: 30,
          paddingVertical: 13,
      }
}