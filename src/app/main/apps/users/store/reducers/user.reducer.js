import * as Actions from '../actions';
import _ from '@lodash';
import * as Constants from 'app/constants'

const initialState = {
    entities: null,
    searchText: '',
    selectedUserIds: [],
    routeParams: {},
    totalRecords: 0,
    pageSize: 10,
    currentPage: 0,
    pages: 1,
    userRoles: null,
    userDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    resetPasswordDialog: {
        props: {
            open: false
        },
        data: null
    },
    iconUrl: null,
    iconFileName: null,
    isUsernameExists: false,
    listQuery: Constants.listQuery

};

const usersReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.USER_BULK_UPLOAD:
            {
                console.log(action.payload);
            }
        case Actions.GET_USERS_ROLES:
            {
                return {
                    ...state,
                    userRoles: JSON.stringify(action.payload.data)
                };
            }
        case Actions.GET_USERS:
            {
                return {
                    ...state,
                    entities: action.payload.items,
                    pages: (Math.ceil(action.payload.totalRecords / action.payload.pageSize)),
                    routeParams: action.routeParams
                };
            }
        case Actions.GET_IS_USERNAME_EXISTS:
            {
                return {
                    ...state,
                    isUsernameExists: action.payload,

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
        case Actions.OPEN_NEW_USER_DIALOG:
            {
                return {
                    ...state,
                    userDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_USER_DIALOG:
            {
                return {
                    ...state,
                    userDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_USER_DIALOG:
            {

                return {
                    ...state,
                    userDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_USER_DIALOG:
            {
                return {
                    ...state,
                    userDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }

        case Actions.OPEN_RESETPASSWORD_USER_DIALOG:
            {

                return {
                    ...state,
                    resetPasswordDialog: {
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_RESETPASSWORD_DIALOG:
            {
                return {
                    ...state,
                    resetPasswordDialog: {
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

export default usersReducer;
