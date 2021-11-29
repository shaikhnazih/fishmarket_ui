import * as Actions from '../actions';
import _ from '@lodash';
import * as Constants from 'app/constants'
const initialState = {
    entities: null,
    searchText: '',
    routeParams: {},
    totalRecords: 0,
    pageSize: 10,
    pages: 1,
    currentPage: 0,
    listQuery: Constants.listQuery,
    uploadDialog: {
        props: {
            open: false
        },
        data: null
    }
    , loading: false
    , uploadResponse: null
    , schemes: []

};

const retailerTargetReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.RETAILERTARGET_BULK_UPLOAD:
            {

                return {
                    ...state,
                    loading: false,
                    uploadResponse: action.payload
                };
            }

        case Actions.GET_RETAILERTARGET:
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
        case Actions.GET_SCHEMES:
            {

                console.log('=========log===========================');
                console.log(action);
                console.log('====================================');
                return {
                    ...state,
                    schemes: action.payload
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

        default:
            {
                return state;
            }
    }
};

export default retailerTargetReducer;
