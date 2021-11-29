import {combineReducers} from 'redux';
import giftsCategory from './giftsCategory.reducer';

const reducer = combineReducers({
    giftsCategory,
});

export default reducer;
