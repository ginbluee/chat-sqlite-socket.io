const defaultState = {
    user: null,
    loggedIn: false,
}

export default (state = defaultState, action) => {
    switch(action.type){
        case "LOGIN":
            return { 
                loggedIn: true, 
                user: action.user
            }
        case "LOGOUT": 
            return {
                loggedIn: false,
                user: action.user
            }
        default:
            return state;
    }
}