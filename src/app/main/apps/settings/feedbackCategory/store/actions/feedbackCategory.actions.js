import axios from 'axios';
import * as Actions from 'app/store/actions';

import * as Constants from 'app/constants';
export const GET_FEEDBACK_CATEGORY = '[SETTING_FEEDBACK CATEGORY APP] GET FEEDBACK CATEGORY';
export const SET_SEARCH_TEXT = '[SETTING_FEEDBACK CATEGORY APP] SET SEARCH TEXT';
export const OPEN_NEW_FEEDBACK_CATEGORY_DIALOG = '[SETTING_FEEDBACK CATEGORY APP] OPEN NEW FEEDBACK DIALOG';
export const CLOSE_NEW_FEEDBACK_CATEGORY_DIALOG = '[SETTING_FEEDBACK CATEGORY APP] CLOSE NEW FEEDBACK DIALOG';
export const OPEN_EDIT_FEEDBACK_CATEGORY_DIALOG = '[SETTING_FEEDBACK CATEGORY APP] OPEN EDIT FEEDBACK DIALOG';
export const CLOSE_EDIT_FEEDBACK_CATEGORY_DIALOG = '[SETTING_FEEDBACK CATEGORY APP] CLOSE EDIT FEEDBACK DIALOG';
export const ADD_FEEDBACK_CATEGORY = '[SETTING_FEEDBACK CATEGORY APP] ADD FEEDBACK';
export const UPDATE_FEEDBACK_CATEGORY = '[SETTING_FEEDBACK CATEGORY APP] UPDATE FEEDBACK';
export const REMOVE_FEEDBACK_CATEGORY = '[SETTING_FEEDBACK CATEGORY APP] REMOVE FEEDBACK';

export function getFeedbackCategory(routeParams) {
    const request = axios.get(Constants.BASE_URL + 'api/feedbackcategory/', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_FEEDBACK_CATEGORY,
                payload: response.data.items,
                routeParams
            })
        );
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function openNewFeedbackCategoryDialog() {
    return {
        type: OPEN_NEW_FEEDBACK_CATEGORY_DIALOG
    }
}

export function closeNewFeedbackCategoryDialog() {
    return {
        type: CLOSE_NEW_FEEDBACK_CATEGORY_DIALOG
    }
}

export function openEditFeedbackCategoryDialog(data) {
    return {
        type: OPEN_EDIT_FEEDBACK_CATEGORY_DIALOG,
        data
    }
}

export function closeEditFeedbackCategoryDialog() {
    return {
        type: CLOSE_EDIT_FEEDBACK_CATEGORY_DIALOG
    }
}

export function addFeedbackCategory(newFeedbackCategory) {
    return (dispatch, getState) => {

        const { routeParams } = getState().feedbackCategoryApp.feedbackCategory;

        const request = axios.post(Constants.BASE_URL + 'api/feedbackcategory', newFeedbackCategory);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_FEEDBACK_CATEGORY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Feedback Category Added Successfully", variant: 'success' }))
                dispatch(getFeedbackCategory(routeParams))
            })
        );
    };
}

export function updateFeedbackCategory(feedbackCategory) {
    return (dispatch, getState) => {

        const { routeParams } = getState().feedbackCategoryApp.feedbackCategory;

        const request = axios.put(Constants.BASE_URL + 'api/feedbackcategory', feedbackCategory);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_FEEDBACK_CATEGORY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Feedback Category Updated Successfully", variant: 'success' }))
                dispatch(getFeedbackCategory(routeParams))
            })            
        );
    };
}

export function removeFeedbackCategory(feedbackCategoryId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().feedbackCategoryApp.feedbackCategory;
        const request = axios.delete(Constants.BASE_URL + 'api/feedbackcategory/' + feedbackCategoryId, {
            feedbackCategoryId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_FEEDBACK_CATEGORY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Feedback Category Deleted Successfully", variant: 'success' }))
                dispatch(getFeedbackCategory(routeParams))
            })
        );
    };
}


export function removeGiftCategories(feedbackCategoryIds) {
    return (dispatch, getState) => {

        const { routeParams } = getState().feedbackCategoryApp.feedbackCategory;

        const request = axios.post('/api/feedback-app/remove-feedback', {
            feedbackCategoryIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_FEEDBACK_CATEGORY
                }),
                dispatch({
                    type: null
                })
            ]).then(() => dispatch(getFeedbackCategory(routeParams)))
        );
    };
}
