import React from 'react';
import {Text,View,Image,StatusBar,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {connect}from 'react-redux';
import {loginUser} from '../actions';
import axios from 'axios';


 class Login extends React.Component{

    state={
        email:'',
        password:''
    }

    static navigationOptions={
        header:null
    }

    onEmailChange=(text)=>{
        this.setState({email:text})
    }

    onPasswordChange=(text)=>{
        this.setState({password:text});
    }

    onLoginPressed=()=>{
        /*axios.post('http://192.168.43.169:5000/authenticateVolunteer',{
            email:this.state.email,
            password:this.state.password
        })
        .then(userid=>{console.log(userid.data);this.props.navigation.navigate("App", {}, {
            type: "Navigate", 
            routeName: "CallOuts",
            action: {
                type: "Navigate", 
                routeName: "CallOuts", 
                params: {userid: userid.data}
            }
        })})
        .catch(err=>alert('Error logging in'));*/

        this.props.loginUser({email:this.state.email,password:this.state.password,navigation:this.props.navigation});
        
        //this.props.loginUser({email:this.state.email,password:this.state.password,navigation:''});
    }

    //sample added to merge
    validate=()=>{
        
    }
    
    render(){
        return(
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" hidden/>
                <View style={styles.logoStyle}>
                    <Image  /*style={{width:200,height:100}}*/ resizeMode="contain" source={require('./images/cwf.png')} />
                    
                </View>
                    <View style={styles.formStyle}>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.email}
                                onChangeText={this.onEmailChange} 
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Email"
                                placeholderTextColor = "#aaa"
                                selectionColor="#ddd"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onFocus={()=>this.setState({borderWidth:1,backgroundColor:'#e8a87c'})}
                                onSubmitEditing={()=> this.password.focus()}
                                />
                        </View>
                        <View style={styles.inputStyle}>
                            <TextInput style={{color:'#000'}}
                                value={this.state.password} 
                                onChangeText={this.onPasswordChange}
                                underlineColorAndroid='rgba(0,0,0,0)' 
                                placeholder="Password"
                                secureTextEntry={true}
                                placeholderTextColor = "#aaa"
                                returnKeyType="done"
                                ref={(input) => this.password = input}
                                />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.onLoginPressed}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>    
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('signUp');}} style={{alignItems:'center'}}>
                            <Text>Signup?</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
}

const mapStateToProps=(state)=>{
    const {user}= state.auth;
    return{user};
}

export default connect(mapStateToProps,{loginUser})(Login)


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
        marginBottom:20
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
        borderWidth:1
    },
    button: {
        width:300,
        backgroundColor:'#1c313a',
         borderRadius: 25,
          marginVertical: 20,
          paddingVertical: 13,
      }
}