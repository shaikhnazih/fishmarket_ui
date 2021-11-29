import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entity: null
};

const catalogueReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_CATALOGUE:
            {
                console.log("reducer action");
                console.log(action);
                return {
                    ...state,
                    entity: action.payload.link
                };
            }
        default:
            {
                return state;
            }
    }
};

export default catalogueReducer;
