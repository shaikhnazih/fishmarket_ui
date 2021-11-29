import {combineReducers} from 'redux';
import gifts from './gifts.reducer';

const reducer = combineReducers({
    gifts,
});

export default reducer;
