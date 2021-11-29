import axios from 'axios';
import * as Actions from 'app/store/actions';
import * as Constants from 'app/constants';
export const GET_POINTEXPIRY = '[SETTING_GET_POINTEXPIRY APP] GET POINTEXPIRY';
export const SET_SEARCH_TEXT = '[SETTING_POINTEXPIRY APP] SET SEARCH TEXT';
export const OPEN_NEW_POINTEXPIRY_DIALOG = '[SETTING_POINTEXPIRY APP] OPEN NEW POINTEXPIRY DIALOG';
export const CLOSE_NEW_POINTEXPIRY_DIALOG = '[SETTING_POINTEXPIRY APP] CLOSE NEW POINTEXPIRY DIALOG';
export const OPEN_EDIT_POINTEXPIRY_DIALOG = '[SETTING_POINTEXPIRY APP] OPEN EDIT POINTEXPIRY DIALOG';
export const CLOSE_EDIT_POINTEXPIRY_DIALOG = '[SETTING_POINTEXPIRY APP] CLOSE EDIT POINTEXPIRY DIALOG';
export const ADD_POINTEXPIRY = '[SETTING_POINTEXPIRY APP] ADD POINTEXPIRY';
export const UPDATE_POINTEXPIRY = '[SETTING_POINTEXPIRY APP] UPDATE POINTEXPIRY';
export const REMOVE_POINTEXPIRY = '[SETTING_POINTEXPIRY APP] REMOVE POINTEXPIRY';

export function getPointExpiry(routeParams) {
    const request = axios.get(Constants.BASE_URL + 'api/Constants/PointExpiry'
    );

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_POINTEXPIRY,
                payload: response.data
            })
        );
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function openNewPointExpiryDialog() {
    return {
        type: OPEN_NEW_POINTEXPIRY_DIALOG
    }
}

export function closeNewPointExpiryDialog() {
    return {
        type: CLOSE_NEW_POINTEXPIRY_DIALOG
    }
}

export function openEditPointExpiryDialog(data) {
    return {
        type: OPEN_EDIT_POINTEXPIRY_DIALOG,
        data
    }
}

export function closeEditPointExpiryDialog() {
    return {
        type: CLOSE_EDIT_POINTEXPIRY_DIALOG
    }
}

export function addPointExpiry(newPointExpiry) {
    return (dispatch, getState) => {


        const request = axios.post(Constants.BASE_URL + 'api/Constants/PointExpiry', newPointExpiry);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_POINTEXPIRY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "PointExpiry Added Successfully", variant: 'success' }))
                dispatch(getPointExpiry())
            })
        );
    };
}

export function updatePointExpiry(banner) {
    return (dispatch, getState) => {

        const { routeParams } = getState().PointExpiryApp.PointExpiry;
        const request = axios.put(Constants.BASE_URL + 'api/banner/', banner)
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_POINTEXPIRY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "PointExpiry Updated Successfully", variant: 'success' }))
                dispatch(getPointExpiry(routeParams))
            })
        );
    };
}

export function removePointExpiry(bannerId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().PointExpiryApp.PointExpiry;
        const request = axios.delete(Constants.BASE_URL + 'api/banner/' + bannerId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_POINTEXPIRY
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "PointExpiry Deleted Successfully", variant: 'success' }))
                dispatch(getPointExpiry(routeParams))
            })
        );
    };
}


