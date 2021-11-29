import * as Actions from '../actions';
import * as Constants from 'app/constants/'
const initatState = {
    entities: null,
    searchText: '',
    selectedGiftIds: [],
    routeParams: {},
    totalRecords: 0,
    pageSize: 10,
    pages: 1,
    currentPage: 0,
    listQuery: Constants.listQuery,
    data: {
        startDate: null,
        endDate: null,
        settlementDate: null,
        memberType: 'retailer',
        schemeType: 'base',
        regions: null,
        branches: null,
        asMs: null,
        territories: null,
        distributors: null,
        retailers: null,
        productLineCode: '',
        schemeTitle: '',
        budget: 0,
        channel: '',
        mouBenefit: '',
        distributorSource: '',
        calculationMethod: '',
        group: '',
        calculationBase: 'quantity',
        mouPeriodTo: null,
        mouPeriodFrom: null,
        growthPeriodTo: null,
        growthPeriodFrom: null,
        tripEntlFlg: false,
        mouAchvFlg: false,
        paSalesFlg: false,
        growthFlg: false,
        productCategories: null,
        productSubCategories: null,
        products: null,
        schemeSlabs: null,
        targetFlg: false,
        minTarget: 0,
        isActive: 1
    }
    , trips: []
}
const schemeReducer = function (state = initatState, action) {

    switch (action.type) {

        case Actions.ADD_SCHEME:

            {
                return {
                    ...state
                }
            }
        case Actions.GET_SCHEMES:
            {
                return {
                    ...state,
                    entities: action.payload.items,
                    pages: (Math.ceil(action.payload.totalRecords / action.payload.pageSize)),
                    currentPage: action.payload.currentPage,
                    routeParams: action.routeParams
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
        case Actions.GET_SCHEME_BY_ID:
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

export default schemeReducer;