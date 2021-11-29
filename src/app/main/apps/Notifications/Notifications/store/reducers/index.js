import { combineReducers } from 'redux';
import notifications from './notifications.reducer';

const reducer = combineReducers({
    notifications,
});

export default reducer;
