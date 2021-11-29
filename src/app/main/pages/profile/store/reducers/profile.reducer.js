import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    profileData: {
        displayName: '',
        username: '',
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: ''
    }
};

const profileReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PROFILE:
            {
                console.log(action.payload);
                return {
                    ...state,
                    profileData:action.payload
                };
            }
        default:
            {
                return state;
            }
    }
};

export default profileReducer;
