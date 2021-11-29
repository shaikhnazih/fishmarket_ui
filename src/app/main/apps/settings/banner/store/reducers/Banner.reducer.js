import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities: null,
    searchText: '',
    selectedBannerIds: [],
    routeParams: {},
    bannerDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const BannerReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_BANNER:
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
        case Actions.OPEN_NEW_BANNER_DIALOG:
            {
                return {
                    ...state,
                    bannerDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_BANNER_DIALOG:
            {
                return {
                    ...state,
                    bannerDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_BANNER_DIALOG:
            {
                return {
                    ...state,
                    bannerDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_BANNER_DIALOG:
            {
                return {
                    ...state,
                    bannerDialog: {
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

export default BannerReducer;
