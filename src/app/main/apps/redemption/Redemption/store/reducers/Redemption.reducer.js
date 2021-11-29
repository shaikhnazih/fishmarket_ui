import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities: null,
    searchText: '',
    routeParams: {},
    data: [],
    currentPage: 1,
    pageSize: 10,
    totalRecords: 1,
    pages: 1,
    downloadDialog: {
        props: {
            open: false
        },
        data: null
    },
    uploadDialog: {
        props: {
            open: false
        },
        data: null
    },
    redemptionStatusMaster: [],
    giftCategoryMaster: []

    , loading: false
    , uploadResponse: null
};

const RedemptionReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_REDEMPTION:
            {

                return {
                    ...state,
                    entities: action.payload.items,
                    pages: Math.ceil(action.payload.totalRecords / action.payload.pageSize),

                };
            }
        case Actions.SET_SEARCH_TEXT:
            {
                return {
                    ...state,
                    searchText: action.searchText
                };
            }

        case Actions.OPEN_DOWNLOAD_DIALOG:
            {

                return {
                    ...state,
                    downloadDialog: {
                        props: {
                            open: true
                        }
                    }

                };


            }
        case Actions.CLOSE_DOWNLOAD_DIALOG:
            {
                return {
                    ...state,
                    downloadDialog: {
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_UPLOAD_DIALOG:
            {

                return {
                    ...state,
                    uploadDialog: {
                        props: {
                            open: true
                        }
                    }

                };


            }
        case Actions.CLOSE_UPLOAD_DIALOG:
            {
                return {
                    ...state,
                    uploadDialog: {
                        props: {
                            open: false
                        },
                        data: null
                    },
                    loading: false,
                    uploadResponse: {}
                };
            }
        case Actions.GET_REDEMPTION_STATUS_MASTER:
            {
                return {
                    ...state,
                    redemptionStatusMaster: action.payload
                };
            }
        case Actions.GET_REDEMPTION_EXCEL:
            {

                return {
                    ...state,
                    loading: false
                };
            }
        case Actions.SHOW_LOADING:
            {
                return {
                    ...state,
                    loading: true
                };
            }
        case Actions.HIDE_LOADING:
            {

                return {
                    ...state,
                    loading: false
                };
            }

        case Actions.UPLOAD_EXCEL:
            {

                return {
                    ...state,
                    loading: false,
                    uploadResponse: action.payload
                };
            }
        case Actions.GET_GIFTS_CATEGORY_SELECT:
            {
                return {
                    ...state,
                    giftCategoryMaster: action.payload.data.items
                };
            }


        default:
            {
                return state;
            }
    }
};

export default RedemptionReducer;
