import axios from 'axios';
import * as Constants from 'app/constants';
import * as Actions from 'app/store/actions';

export const GET_GIFTS_CATEGORY = '[SETTING_GIFT CATEGORY APP] GET GIFTS CATEGORY';
export const SET_SEARCH_TEXT = '[SETTING_GIFT CATEGORY APP] SET SEARCH TEXT';
export const OPEN_NEW_GIFT_CATEGORY_DIALOG = '[SETTING_GIFT CATEGORY APP] OPEN NEW GIFT DIALOG';
export const CLOSE_NEW_GIFT_CATEGORY_DIALOG = '[SETTING_GIFT CATEGORY APP] CLOSE NEW GIFT DIALOG';
export const OPEN_EDIT_GIFT_CATEGORY_DIALOG = '[SETTING_GIFT CATEGORY APP] OPEN EDIT GIFT DIALOG';
export const CLOSE_EDIT_GIFT_CATEGORY_DIALOG = '[SETTING_GIFT CATEGORY APP] CLOSE EDIT GIFT DIALOG';
export const ADD_GIFT_CATEGORY = '[SETTING_GIFT CATEGORY APP] ADD GIFT';
export const UPDATE_GIFT_CATEGORY = '[SETTING_GIFT CATEGORY APP] UPDATE GIFT';
export const REMOVE_GIFT_CATEGORY = '[SETTING_GIFT CATEGORY APP] REMOVE GIFT';
export const REMOVE_GIFTS_CATEGORY = '[SETTING_GIFT CATEGORY APP] REMOVE GIFTS';
export const SET_LIST_QUERY = '[SETTING_GIFT CATEGORY APP] SET_LIST_QUERY'

export function getGiftsCategory() {

    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/giftcategory/GetGiftCategoryList/', getState().giftsCategoryApp.giftsCategory.listQuery);
        request.then((response) => {
            dispatch({
                type: GET_GIFTS_CATEGORY,
                payload: response.data
            })
        });
    }
}


export function setListQuery(query) {
    return {
        type: SET_LIST_QUERY,
        payLoad: query
    }
}


export function setSearchText(text) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: text
    }
}




export function openNewGiftCategoryDialog() {
    return {
        type: OPEN_NEW_GIFT_CATEGORY_DIALOG
    }
}

export function closeNewGiftCategoryDialog() {
    return {
        type: CLOSE_NEW_GIFT_CATEGORY_DIALOG
    }
}

export function openEditGiftCategoryDialog(data) {
    return {
        type: OPEN_EDIT_GIFT_CATEGORY_DIALOG,
        data
    }
}

export function closeEditGiftCategoryDialog() {
    return {
        type: CLOSE_EDIT_GIFT_CATEGORY_DIALOG
    }
}

export function addGiftCategory(newGiftCategory) {
    return (dispatch, getState) => {

        const { routeParams } = getState().giftsCategoryApp.giftsCategory;

        const request = axios.post(Constants.BASE_URL + 'api/giftcategory', newGiftCategory);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_GIFT_CATEGORY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Gift Category Added Successfully", variant: 'success' }))
                dispatch(getGiftsCategory(routeParams))
            })
        );
    };
}

export function updateGiftCategory(giftCategory) {
    return (dispatch, getState) => {

        const { routeParams } = getState().giftsCategoryApp.giftsCategory;

        const request = axios.put(Constants.BASE_URL + 'api/giftcategory/', giftCategory)
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_GIFT_CATEGORY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Gift Category Updated Successfully", variant: 'success' }))
                dispatch(getGiftsCategory(routeParams))
            })
        );
    };
}

export function removeGiftCategory(giftCategoryId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().giftsCategoryApp.giftsCategory;
        const request = axios.delete(Constants.BASE_URL + 'api/giftcategory/' + giftCategoryId, {
            giftCategoryId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_GIFT_CATEGORY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Gift Category Deleted Successfully", variant: 'success' }))
                dispatch(getGiftsCategory(routeParams))
            })
        );
    };
}

export function removeGiftCategories(giftCategoryIds) {
    return (dispatch, getState) => {

        const { routeParams } = getState().giftsCategoryApp.giftsCategory;

        const request = axios.post('/api/gifts-app/remove-gifts', {
            giftCategoryIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_GIFTS_CATEGORY
                }),
                dispatch({
                    type: null
                })
            ]).then(() => dispatch(getGiftsCategory(routeParams)))
        );
    };
}
