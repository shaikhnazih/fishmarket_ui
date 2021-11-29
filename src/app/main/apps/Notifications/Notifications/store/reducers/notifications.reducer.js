import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities: null,
    searchText: '',
    routeParams: {},
    totalRecords: 0,
    notificationsDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const notificationsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_NOTIFICATIONS_CATEGORY_SELECT:
            {
                return {
                    ...state,
                    notificationsCategories: JSON.stringify(action.payload)
                };
            }
        case Actions.GET_NOTIFICATIONS:
            {
                return {
                    ...state,
                    entities: action.payload.items,
                    totalRecords: action.payload.totalRecords,
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
        case Actions.OPEN_NEW_NOTIFICATIONS_DIALOG:
            {
                return {
                    ...state,
                    notificationsDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_NOTIFICATIONS_DIALOG:
            {
                return {
                    ...state,
                    notificationsDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_NOTIFICATIONS_DIALOG:
            {

                return {
                    ...state,
                    notificationsDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_NOTIFICATIONS_DIALOG:
            {
                return {
                    ...state,
                    notificationsDialog: {
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

export default notificationsReducer;
