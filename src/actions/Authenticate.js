import {NavigationActions, StackActions} from 'react-navigation';

export const loginSuccess = (user) => {
    return(dispatch) => {
        dispatch({
            type: "LOGIN",
            user
        })
        const resetNavigator = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Screen_Chat' })],
        })
        dispatch(resetNavigator);
    }
}

export const logoutSuccess = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOGOUT',
        })
        const goLogin = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Screen_Login' })],
            //routeName: 'Screen_Chat',
            // action: NavigationActions.navigate({routeName:'Screen_Chat'})
        })
        dispatch(goLogin);
    }
}