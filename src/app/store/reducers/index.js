import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import shared from './shared'

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        shared,
        ...asyncReducers
    });

export default createReducer;
