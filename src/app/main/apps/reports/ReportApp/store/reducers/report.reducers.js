import * as Actions from '../actions';
import * as Constants from 'app/constants/'
const initatState = {

    reportTypes: [],
    entities: null,
    searchText: '',
    selectedGiftIds: [],
    routeParams: {},
    totalRecords: 0,
    pageSize: 10,
    pages: 1,
    currentPage: 0,
    listQuery: Constants.listQuery,
}
const reportReducer = function (state = initatState, action) {

    switch (action.type) {
        case Actions.GET_REPORT_SCHEMA:
            {
                return {
                    ...state,
                    reportSchema: action.payload,
                };
            }
        case Actions.GET_REPORT_TYPES:
            {
                return {
                    ...state,
                    reportTypes: action.payload,
                };
            }

        case Actions.GET_TRIPS:
            {
                return {
                    ...state,
                    trips: action.payload.items
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
        case Actions.GET_REPORT_BY_ID:
            {
                return {
                    ...state,

                    data: action.payload

                };

            }

        case Actions.CLEAR_FORM:
            {

                return {
                    ...initatState,
                };

            }



        default: return state;

    }
}

export default reportReducer;