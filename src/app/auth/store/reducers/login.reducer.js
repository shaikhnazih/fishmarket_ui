import * as Actions from '../actions';

const initialState = {
    noOfAttempts: 0,
    success: false,
    error: {
        username: null,
        password: null
    }
};

const login = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN_SUCCESS:
            {
                debugger;
                return {
                    ...initialState,
                    success: true,
                    noOfAttempts: 0
                };
            }
        case Actions.LOGIN_ERROR:
            {
                return {
                    success: false,
                    error: action.payload,
                    //    noOfAttempts: state.noOfAttempts
                };
            }
        default:
            {
                return state
            }
    }
};

export default login;