import React from 'react';
import {createBottomTabNavigator,DrawerItems,createStackNavigator, createSwitchNavigator, createAppContainer,createDrawerNavigator} from 'react-navigation';
import Login from './Login';
import {fromRight, fromBottom, zoomIn} from 'react-navigation-transitions';
import {ClassRooms,Profile,Inbox} from './appScreens';
import CallOuts from './appScreens/CallOuts';
import Icon from 'react-native-vector-icons/Ionicons';
import Settings from './drawer/Settings';
import Bookmarks from './drawer/Bookmarks';
import {Text,View,Image} from 'react-native';
import Announcement from './callstack/Announcement';
import {StatusBar} from 'react-native';
import SignUp from './SignUp';
import RegisteredEvents from './registeredevents/RegisteredEvents';


import {Container,Header, Body, Content} from 'native-base';
import ImageView from './callstack/ImageView';






const CallStack = createStackNavigator(
    {
        CallOuts:{
            screen:CallOuts,
            navigationOptions:{
                header:null,
                title:'Announcements'
            }
        },
        Announcement:{
            screen:Announcement,
            navigationOptions:{
                header:null
            },
            transitionConfig:()=>fromBottom(500)
        },
        Image:{
            screen:ImageView,
            navigationOptions:{
                header:null,
                tabBarOptions:{
                    tabBarVisible:false
                }
            },
            transitionConfig:()=>fromRight(500)
        }
    },
    {
        initialRouteName: 'CallOuts',
        headerLayoutPreset:'center',
        defaultNavigationOptions:{
            
            headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'#116466',
                flex:1
              }   
        }
    }
)

const CustomDrawerContentComponent = (props)=>(
    <Container>
        <Header style={{backgroundColor:"#116466",height:100}}>
            <Body style={{padding:30,margin:30}}>
                <Image style={styles.drawerItem} source={require('./images/book8.png')}/>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>
)

const Drawer = createDrawerNavigator(
    {
        CallStack:{
            screen:CallStack,
            navigationOptions:{
                title:'Call Outs',
                drawerIcon: ({tintColor})=>(
                    <Icon name="ios-megaphone" color={tintColor} size={24}/>
                )
            }
        },
        Settings:{
            screen:Settings,
            navigationOptions:{
                title:'Settings',
                drawerIcon: ({tintColor})=>(
                    <Icon name="ios-settings" color={tintColor} size={24}/>
                )
            }
        },
        Bookmarks:{
            screen:Bookmarks,
            navigationOptions:{
                title:'Bookmarks',
                drawerIcon: ({tintColor})=>(
                    <Icon name="ios-bookmark" color={tintColor} size={24}/>
                )
            }
        }
    },
    {
        initialRouteName:'CallStack',
        contentComponent:CustomDrawerContentComponent,
        drawerOpenRoute:'DrawerOpen',
        drawerCloseRoute:'DrawerClose',
        drawerToggleRoute:'DrawerToggle',
        contentOptions:{
            activeTintColor:'#116466',
            inactiveTintColor:"#888",
            labelStyle:{
                fontFamily:'roboto'
            }
        }
    }
)

const ClassStack = createStackNavigator(
    {
        ClassRooms:{
            screen:ClassRooms,
            navigationOptions:{
                header:null,
                title:'Classrooms'
            }
        }
    },
    {
        initialRouteName: 'ClassRooms',
        headerLayoutPreset:'center',
        defaultNavigationOptions:{
            
            headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'#116466',
                flex:1,
                fontFamily:'roboto'
              }   
        },
        transitionConfig:()=>fromRight(500),
    }
)

const InboxStack = createStackNavigator(
    {
        Inbox:{
            screen:Inbox,
            navigationOptions:{
                header:null,
                title:'Inbox'
            }
        }
    },
    {
        initialRouteName: 'Inbox',
        headerLayoutPreset:'center',
        defaultNavigationOptions:{
            
            headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'#116466',
                flex:1,
                fontFamily:'roboto'
              }   
        },
        transitionConfig:()=>fromRight(500),
    }
)

const ProfileStack = createStackNavigator(
    {
        Profile:{
            screen:Profile,
            navigationOptions:{
                header:null,
                title:'Profile'
            }
        }
    },
    {
        initialRouteName: 'Profile',
        headerLayoutPreset:'center',
        defaultNavigationOptions:{
            
            headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'#116466',
                flex:1,
                fontFamily:'roboto'
              }   
        },
        transitionConfig:()=>fromRight(500),
    }
)

const Auth = createStackNavigator(
    {
        signIn:Login,
        signUp: SignUp
    },
    {
        initialRouteName: 'signIn',
        headerLayoutPreset:'center',
        defaultNavigationOptions:{
            
            headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'#111',
                flex:1,
                fontFamily:'roboto'
              }   
        },
        transitionConfig:()=>fromRight(500),
    }
)

const RegisteredEStack = createStackNavigator(
    {
        RegisteredEvents:{
            screen:RegisteredEvents,
            navigationOptions:{
                header:null,
                title:'Registered Events'
            }
        }
    },
    {
        initialRouteName: 'RegisteredEvents',
        headerLayoutPreset:'center',
        defaultNavigationOptions:{
            
            headerStyle: {
                backgroundColor: '#fff',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                color:'#116466',
                flex:1,
                fontFamily:'roboto'
              }   
        },
        transitionConfig:()=>fromRight(500),
    }
) 


const App = createBottomTabNavigator(
    {
        CallOuts:{
            screen:Drawer,
            navigationOptions:{
                tabBarIcon:({tintColor})=>(
                    <Icon name="ios-megaphone" color={tintColor} size={24}/>
                )
            }
        },
        ClassRooms:{
            screen:RegisteredEStack,
            navigationOptions:{
                tabBarLabel:'CLASSROOM',
                tabBarIcon:({tintColor})=>(
                    <Icon name="ios-alarm" color={tintColor} size={24}/>
                )
            }
        },
        /*Inbox:{
            screen:InboxStack,
            navigationOptions:{
                tabBarLabel:'INBOX',
                tabBarIcon:({tintColor})=>(
                    <Icon name="ios-chatboxes" color={tintColor} size={24}/>
                )
            }
        },*/
        Profile:{
            screen:ProfileStack,
            navigationOptions:{
                tabBarLabel:'PROFILE',
                tabBarIcon:({tintColor})=>(
                    <Icon name="ios-person" color={tintColor} size={24}/>
                )
            }
        }
    },
    {
        initialRouteName: 'CallOuts',
        headerLayoutPreset:'center',
        transitionConfig:()=>fromRight(500),
        tabBarOptions: {
            showLabel:false,
            activeTintColor: '#116466',
            inactiveTintColor: '#ddd',
            style:{
                elevation:8,
                borderTopWidth: 0,
                backgroundColor:'#fff'
            },
            showIcon:true,
            
        }
    }
)

const Main = createSwitchNavigator(
    {
        App:App,
        Auth:Auth
    },
    {
        initialRouteName:'Auth'
    }
)

const styles={
    drawerItem:{
        height:150,
        width:150,
        borderRadius:75
    }
}




const MainApp =  createAppContainer(Main);

const MainRoute =()=>{
    return(<View style={{flex:1}}>
        <MainApp/>
        <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
    </View>)
}

export default MainRoute;