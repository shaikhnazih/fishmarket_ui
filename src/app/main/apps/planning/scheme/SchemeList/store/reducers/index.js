import {combineReducers} from 'redux';
import schemes from './scheme.reducer';

const reducer = combineReducers({
    schemes,
});

export default reducer;
