import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    items: null
};

const catalogueReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CATALOGUE:
            {
                console.log("reducer action");
                console.log(action);
                return {
                    ...state,
                    items: action.payload.items
                };
            }
        default:
            {
                return state;
            }
    }
};

export default catalogueReducer;
