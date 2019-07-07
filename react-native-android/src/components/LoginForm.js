import React from 'react';
import {View,Text,Image,KeyboardAvoidingView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Form from'./Form';

class LoginForm extends React.Component{
    render(){
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../components/images/book3.png')} />
                    <Text>LibraryApp</Text>
                </View>
                <View style={styles.formContainer}>
                    <Form/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor:'#091f36'
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 200
    },
    formContainer:{
        flex:1,
        margin: 15,
        justifyContent:'center'
    }
}
//#000   , #091f36
export default LoginForm;