import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Chat from '../screens/Chat';

export default FirstStack = StackNavigator({
    Screen_Login: {
        screen: Login,
        navigationOptions:{
            title: 'LOGIN SCREEN',
        }
    },
    Screen_Register: {
        screen: Register,
        navigationOptions:{
            title: 'REGISTER SCREEN'
        }
    },
    Screen_Chat: {
        screen: Chat,
        navigationOptions:{
            title: 'CHAT SCREEN'
        }
    }
})
