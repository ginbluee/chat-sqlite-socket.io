import React, { Component } from 'react';
import {View, Text} from 'react-native';
import AppNavigator from './AppNavigator';
import {Provider} from 'react-redux';
import store from './store';

export default class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}
console.disableYellowBox = true;