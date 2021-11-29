import {combineReducers} from 'redux';
import feedbackCategory from './feedbackCategory.reducer';

const reducer = combineReducers({
    feedbackCategory,
});

export default reducer;
