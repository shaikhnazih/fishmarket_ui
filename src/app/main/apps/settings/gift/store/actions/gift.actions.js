import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';
import { useDispatch, useSelector } from 'react-redux';


export const GET_GIFTS = '[SETTING_GIFT APP] GET GIFTS';
export const SET_SEARCH_TEXT = '[SETTING_GIFT APP] SET SEARCH TEXT';
export const OPEN_NEW_GIFT_DIALOG = '[SETTING_GIFT APP] OPEN NEW GIFT DIALOG';
export const CLOSE_NEW_GIFT_DIALOG = '[SETTING_GIFT APP] CLOSE NEW GIFT DIALOG';
export const OPEN_EDIT_GIFT_DIALOG = '[SETTING_GIFT APP] OPEN EDIT GIFT DIALOG';
export const CLOSE_EDIT_GIFT_DIALOG = '[SETTING_GIFT APP] CLOSE EDIT GIFT DIALOG';
export const ADD_GIFT = '[SETTING_GIFT APP] ADD GIFT';
export const UPDATE_GIFT = '[SETTING_GIFT APP] UPDATE GIFT';
export const REMOVE_GIFT = '[SETTING_GIFT APP] REMOVE GIFT';
export const REMOVE_GIFTS = '[SETTING_GIFT APP] REMOVE GIFTS';
export const GET_GIFTS_CATEGORY_SELECT = '[GET_GIFTS_CATEGORY_SELECT]';
export const GIFT_BULK_UPLOAD = '[GIFT_BULK_UPLOAD]';
export const SET_LIST_QUERY = '[SET_LIST_QUERY]';


export function giftBulkUpload(fileName) {
    const request = axios.post(Constants.BASE_URL + 'api/gift/BulkUpload/', { fileName: fileName });
    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: GIFT_BULK_UPLOAD,
                    payload: response
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Bulk Upload Success.", variant: 'success' }))
                dispatch(getGifts(Constants.listQuery))
            })
        );
}

export function getGiftCategorySelectOptions() {
    const request = axios.get(Constants.BASE_URL + 'api/giftcategory/');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_GIFTS_CATEGORY_SELECT,
                payload: response
            })
        );
}

export function getGifts() {

    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/gift/GetList/', getState().giftsApp.gifts.listQuery);
        request.then((response) => {
            console.log(response);
            console.log("response");
            dispatch({
                type: GET_GIFTS,
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

export function openNewGiftDialog() {
    return {
        type: OPEN_NEW_GIFT_DIALOG
    }
}

export function closeNewGiftDialog() {
    return {
        type: CLOSE_NEW_GIFT_DIALOG
    }
}

export function openEditGiftDialog(data) {
    return {
        type: OPEN_EDIT_GIFT_DIALOG,
        data
    }
}

export function closeEditGiftDialog() {
    return {
        type: CLOSE_EDIT_GIFT_DIALOG
    }
}

export function addGift(newGift) {
    return (dispatch, getState) => {
        newGift.maxQuantity = parseInt(newGift.maxQuantity);
        newGift.points = parseInt(newGift.points);
        newGift.giftValueInRs = parseInt(newGift.giftValueInRs);
        const request = axios.post(Constants.BASE_URL + 'api/gift', newGift);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_GIFT
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Gift Added Successfully", variant: 'success' }))
                dispatch(getGifts())
            })
        );
    };
}

export function updateGift(gift) {
    return (dispatch, getState) => {
        gift.maxQuantity = parseInt(gift.maxQuantity);
        gift.points = parseInt(gift.points);
        gift.giftValueInRs = parseInt(gift.giftValueInRs);
        const request = axios.put(Constants.BASE_URL + 'api/gift', gift);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_GIFT
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Gift Updated Successfully", variant: 'success' }))
                dispatch(getGifts())
            })
        );
    };
}

// export function uploadFile(file) {

//     console.log('in uploadFile action');
//     console.log(file);
//     return (dispatch, getState) => {

//         const { routeParams } = getState().giftsApp.gifts;
//         const request = axios.post(Constants.BASE_URL + 'api/File/', file);

//         return request.then((response) =>
//         dispatch({
//             type: UPLOAD_FILE,
//             payload: response.data.fileName,
//         })
//         );
//     };
// }


export function removeGift(giftId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().giftsApp.gifts;

        const request = axios.delete(Constants.BASE_URL + 'api/gift/' + giftId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_GIFT
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Gift Deleted Successfully", variant: 'success' }))
                dispatch(getGifts(Constants.listQuery))
            })
        );
    };
}

export function removeGifts(giftIds) {
    return (dispatch, getState) => {

        const { routeParams } = getState().giftsApp.gifts;

        const request = axios.post('/api/gifts-app/remove-gifts', {
            giftIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_GIFTS
                }),
                dispatch({
                    type: null
                })
            ]).then(() => dispatch(getGifts(Constants.listQuery)))
        );
    };
}

//export function toggleStarredGift(giftId)
//{
//    return (dispatch, getState) => {
//        const {routeParams} = getState().giftsApp.gifts;

//        const request = axios.post('/api/gifts-app/toggle-starred-gift', {
//            giftId
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: TOGGLE_STARRED_GIFT
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getGifts(routeParams)))
//        );
//    };
//}

//export function toggleStarredGifts(giftIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().giftsApp.gifts;

//        const request = axios.post('/api/gifts-app/toggle-starred-gifts', {
//            giftIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: TOGGLE_STARRED_GIFTS
//                }),
//                dispatch({
//                    type: DESELECT_ALL_GIFTS
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getGifts(routeParams)))
//        );
//    };
//}

//export function setGiftsStarred(giftIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().giftsApp.gifts;

//        const request = axios.post('/api/gifts-app/set-gifts-starred', {
//            giftIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: SET_GIFTS_STARRED
//                }),
//                dispatch({
//                    type: DESELECT_ALL_GIFTS
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getGifts(routeParams)))
//        );
//    };
//}

//export function setGiftsUnstarred(giftIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().giftsApp.gifts;

//        const request = axios.post('/api/gifts-app/set-gifts-unstarred', {
//            giftIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: SET_GIFTS_STARRED
//                }),
//                dispatch({
//                    type: DESELECT_ALL_GIFTS
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getGifts(routeParams)))
//        );
//    };
//}
