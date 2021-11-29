import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities: null,
    searchText: '',
    selectedFeedbackCategoryIds: [],
    routeParams: {},
    feedbackCategoryDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const feedbackCategoryReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_FEEDBACK_CATEGORY:
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
        case Actions.OPEN_NEW_FEEDBACK_CATEGORY_DIALOG:
            {
                return {
                    ...state,
                    feedbackCategoryDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                };
            }
        case Actions.CLOSE_NEW_FEEDBACK_CATEGORY_DIALOG:
            {
                return {
                    ...state,
                    feedbackCategoryDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_FEEDBACK_CATEGORY_DIALOG:
            {
                return {
                    ...state,
                    feedbackCategoryDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                };
            }
        case Actions.CLOSE_EDIT_FEEDBACK_CATEGORY_DIALOG:
            {
                return {
                    ...state,
                    feedbackCategoryDialog: {
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

export default feedbackCategoryReducer;
