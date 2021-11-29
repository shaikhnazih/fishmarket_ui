import axios from 'axios';
import * as Actions from 'app/store/actions';
import * as Constants from 'app/constants';
export const GET_BANNER = '[SETTING_GET_BANNER APP] GET BANNER';
export const SET_SEARCH_TEXT = '[SETTING_BANNER APP] SET SEARCH TEXT';
export const OPEN_NEW_BANNER_DIALOG = '[SETTING_BANNER APP] OPEN NEW BANNER DIALOG';
export const CLOSE_NEW_BANNER_DIALOG = '[SETTING_BANNER APP] CLOSE NEW BANNER DIALOG';
export const OPEN_EDIT_BANNER_DIALOG = '[SETTING_BANNER APP] OPEN EDIT BANNER DIALOG';
export const CLOSE_EDIT_BANNER_DIALOG = '[SETTING_BANNER APP] CLOSE EDIT BANNER DIALOG';
export const ADD_BANNER = '[SETTING_BANNER APP] ADD BANNER';
export const UPDATE_BANNER = '[SETTING_BANNER APP] UPDATE BANNER';
export const REMOVE_BANNER = '[SETTING_BANNER APP] REMOVE BANNER';

export function getBanner(routeParams) {
    const request = axios.get(Constants.BASE_URL + 'api/banner/', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_BANNER,
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

export function openNewBannerDialog() {
    return {
        type: OPEN_NEW_BANNER_DIALOG
    }
}

export function closeNewBannerDialog() {
    return {
        type: CLOSE_NEW_BANNER_DIALOG
    }
}

export function openEditBannerDialog(data) {
    return {
        type: OPEN_EDIT_BANNER_DIALOG,
        data
    }
}

export function closeEditBannerDialog() {
    return {
        type: CLOSE_EDIT_BANNER_DIALOG
    }
}

export function addBanner(newBanner) {
    return (dispatch, getState) => {

        const { routeParams } = getState().BannerApp.Banner;

        const request = axios.post(Constants.BASE_URL + 'api/banner', newBanner);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_BANNER
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Banner Added Successfully", variant: 'success' }))
                dispatch(getBanner(routeParams))
            })
        );
    };
}

export function updateBanner(banner) {
    return (dispatch, getState) => {

        const { routeParams } = getState().BannerApp.Banner;
        const request = axios.put(Constants.BASE_URL + 'api/banner/', banner)
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_BANNER
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Banner Updated Successfully", variant: 'success' }))
                dispatch(getBanner(routeParams))
            })
        );
    };
}

export function removeBanner(bannerId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().BannerApp.Banner;
        const request = axios.delete(Constants.BASE_URL + 'api/banner/' + bannerId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_BANNER
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Banner Deleted Successfully", variant: 'success' }))
                dispatch(getBanner(routeParams))
            })
        );
    };
}


