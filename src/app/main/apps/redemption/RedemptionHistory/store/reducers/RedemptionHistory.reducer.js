import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities: null,
    searchText: '',
    routeParams: {},
    data: []
};

const RedemptionHistoryReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_REDEMPTIONHISTORY:
            {
                return {
                    ...state,
                    entities: _.keyBy(action.payload, 'id'),
                    routeParams: action.routeParams
                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }
        default:
            {
                return state;
            }
    }
};

export default RedemptionHistoryReducer;
