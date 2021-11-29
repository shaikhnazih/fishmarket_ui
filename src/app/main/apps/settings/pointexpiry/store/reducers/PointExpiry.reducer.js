import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities: null,
    searchText: '',
    selectedPointExpiryIds: [],
    routeParams: {},
    pointExpiryDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const PointExpiryReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_POINTEXPIRY:
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
        case Actions.OPEN_NEW_POINTEXPIRY_DIALOG:
            {
                return {
                    ...state,
                    pointExpiryDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_POINTEXPIRY_DIALOG:
            {
                return {
                    ...state,
                    pointExpiryDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_POINTEXPIRY_DIALOG:
            {
                return {
                    ...state,
                    pointExpiryDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_POINTEXPIRY_DIALOG:
            {
                return {
                    ...state,
                    pointExpiryDialog: {
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

export default PointExpiryReducer;
