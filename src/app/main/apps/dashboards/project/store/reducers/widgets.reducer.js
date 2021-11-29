import * as Actions from '../actions';

const initialState = {
    widgets: null,
    widgets1: null
};

const widgetsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_WIDGETS:
            return {
                ...state,
                widgets: { ...action.payload }
            };
        case Actions.GET_WIDGETS1:
            return {
                ...state,
                widgets1: { ...action.payload }
            };
        default:
            return state;
    }
};

export default widgetsReducer;
