import {combineReducers} from 'redux';

import User from './User';
import Navigation from './Navigation';

export default combineReducers({
    User,
    nav: Navigation,
});