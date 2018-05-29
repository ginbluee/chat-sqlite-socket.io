import React, { Component } from 'react';
import { addNavigationHelpers } from 'react-navigation';
import RootNavigation from './navigations/RootNavigation';
import {connect} from 'react-redux';
import {
    createReduxBoundAddListener, 
    createReactNavigationReduxMiddleware, 
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

class AppNavigator extends React.Component{
    render(){
        return(
            <RootNavigation 
                navigation={{
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener,
                }}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        nav: state.nav,
    }
}

export default connect(mapStateToProps)(AppNavigator);

