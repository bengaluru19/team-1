import React from 'react';
import Login from './components/Login';
import Router from './components/Router';
import {StatusBar,View} from 'react-native';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebase from 'firebase';


class App extends React.Component{


    componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyBQHJN-h2UPC-wxbjUoXs7GYQ7NUl1zrJY",
            authDomain: "classroom-4287a.firebaseapp.com",
            databaseURL: "https://classroom-4287a.firebaseio.com",
            projectId: "classroom-4287a",
            storageBucket: "",
            messagingSenderId: "228215889813",
            appId: "1:228215889813:web:8557071df559d59f"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }







    render(){
        return(
            <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
                <View style={{flex:1}}>
                    <Router/>
                    <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
                </View>
            </Provider>
        )
    }
}

export default App;