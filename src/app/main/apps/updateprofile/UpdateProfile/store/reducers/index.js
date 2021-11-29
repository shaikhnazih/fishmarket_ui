import { combineReducers } from 'redux';
import catalogue from './catalogue.reducer';

const reducer = combineReducers({
    catalogue,
});

export default reducer;
