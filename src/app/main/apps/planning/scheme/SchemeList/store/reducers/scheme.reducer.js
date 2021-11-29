import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedSchemeIds: [],
    routeParams       : {},
    schemeDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const schemeReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_SCHEMES:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, 'code'),
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
        case Actions.OPEN_NEW_SCHEME_DIALOG:
        {
            return {
                ...state,
                schemeDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_SCHEME_DIALOG:
        {
            return {
                ...state,
                schemeDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_SCHEME_DIALOG:
        {
            return {
                ...state,
                schemeDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_SCHEME_DIALOG:
        {
            return {
                ...state,
                schemeDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default schemeReducer;
