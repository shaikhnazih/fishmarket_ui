import * as Actions from '../actions';
import _ from '@lodash';
import * as Constants from 'app/constants'
const initialState = {
    entities: null,
    searchText: '',
    routeParams: {},
    data: [],
    totalRecords: 0,
    pageSize: 10,
    pages: 1,
    currentPage: 0,
    listQuery: Constants.listQuery
};

const FeedbackReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_FEEDBACK:
            {
                console.log(action.payload);
                return {
                    ...state,
                    entities: action.payload.items,
                    pages: (Math.ceil(action.payload.totalRecords / action.payload.pageSize)),
                    currentPage: action.payload.currentPage,
                    routeParams: action.routeParams
                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText,
                    listQuery: action.searchText.length > 0 ?
                        { ...state.listQuery, parameters: [{ name: "searchtext", value: action.searchText }], currentPage: 0 }
                        : { ...state.listQuery, parameters: [] }
                };
            }
        case Actions.SET_LIST_QUERY:
            {
                return {
                    ...state,
                    listQuery: action.payLoad
                }
            }
        default:
            {
                return state;
            }
    }
};

export default FeedbackReducer;
