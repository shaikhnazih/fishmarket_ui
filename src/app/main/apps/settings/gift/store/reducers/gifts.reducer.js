import * as Actions from '../actions';
import _ from '@lodash';
import * as Constants from 'app/constants'
const initialState = {
    entities: null,
    searchText: '',
    selectedGiftIds: [],
    routeParams: {},
    totalRecords: 0,
    pageSize: 10,
    pages: 1,
    currentPage: 0,
    giftCategories: null,
    giftDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    iconUrl: null,
    iconFileName: null,
    listQuery: Constants.listQuery

};

const giftReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GIFT_BULK_UPLOAD:
            {
                console.log(action.payload);
            }
        case Actions.GET_GIFTS_CATEGORY_SELECT:
            {
                return {
                    ...state,
                    giftCategories: JSON.stringify(action.payload)
                };
            }
        case Actions.GET_GIFTS:
            {
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
                        { ...state.listQuery, parameters: [{ name: "name", value: action.searchText }], currentPage: 0 }
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
        case Actions.OPEN_NEW_GIFT_DIALOG:
            {
                return {
                    ...state,
                    giftDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_GIFT_DIALOG:
            {
                return {
                    ...state,
                    giftDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_GIFT_DIALOG:
            {

                return {
                    ...state,
                    giftDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_GIFT_DIALOG:
            {
                return {
                    ...state,
                    giftDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }

        default:
            {
                return state;
            }
    }
};

export default giftReducer;
