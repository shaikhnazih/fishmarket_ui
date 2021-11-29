import { combineReducers } from 'redux';
import hierarchyMaster from './hierarchyMaster.reducer';
import productMaster from './productMaster.reducer';
const sharedReducers = combineReducers({
    hierarchyMaster,
    productMaster,

});

export default sharedReducers;
