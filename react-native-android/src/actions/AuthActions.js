import {LOGIN_SUCCESS,LOGIN_FAIL} from './types';
import firebase from 'firebase';
import axios from 'axios'


export const loginUser=({email,password,navigation})=>{
    return (dispatch)=>{       
        axios.post('http://192.168.43.169:5000/authenticateVolunteer',{
            email:email,
            password:password
        })
        .then(userid=>{console.log(userid);dispatch({type:LOGIN_SUCCESS,payload:{userid:userid.data}}); navigation.navigate('App')})
        .catch(err=>alert('Error logging in'))
    }
}

export const randomReducer=()=>{

}


export const signupUser=({name,email,phone,organization})=>{
    //later
}