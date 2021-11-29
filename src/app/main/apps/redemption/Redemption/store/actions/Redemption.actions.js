import axios from 'axios';
import * as Constants from 'app/constants';
import * as Actions from 'app/store/actions';

export const GET_REDEMPTION = 'GET_REDEMPTION';
export const UPDATE_REDEMPTION = 'UPDATE_REDEMPTION';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

export const OPEN_DOWNLOAD_DIALOG = '[REDEMPTION APP] OPEN DOWNLOAD DIALOG';
export const CLOSE_DOWNLOAD_DIALOG = '[REDEMPTION APP] CLOSE DOWNLOAD DIALOG';


export const OPEN_UPLOAD_DIALOG = '[REDEMPTION APP] OPEN UPLOAD DIALOG';
export const CLOSE_UPLOAD_DIALOG = '[REDEMPTION APP] CLOSE UPLOAD DIALOG';
export const GET_REDEMPTION_STATUS_MASTER = '[REDEMPTION APP] GET REDEMPTION STATUS MASTER';

export const GET_REDEMPTION_EXCEL = 'GET REDEMPTION EXCEL';
export const SHOW_LOADING = 'REDEMPTION SHOW LOADING';
export const HIDE_LOADING = 'REDEMPTION HIDE LOADING';
export const GET_GIFTS_CATEGORY_SELECT = 'GET GIFTS CATEGORY SELECT'

export const UPLOAD_EXCEL = 'UPLOAD EXCEL ';



export function getRedemption(query = Constants.listQuery) {
    const request = axios.post(Constants.BASE_URL + 'api/redemption/getRedemptions', query);

    return (dispatch) =>
        request.then((response) => {
            console.log(response)
            dispatch({
                type: GET_REDEMPTION,
                payload: response.data,
            })
        });
}


export function getRedemptionStatusMaster() {
    const request = axios.get(Constants.BASE_URL + 'api/redemption/getRedemptionMaster');
    return (dispatch) =>
        request.then((response) => {
            console.log(response)
            dispatch({
                type: GET_REDEMPTION_STATUS_MASTER,
                payload: response.data,
            })
        });
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

export function getRedemptionsExcel(p) {
    const request = axios.post(Constants.BASE_URL + 'api/redemption/getRedemptionsExcel', p);
    return (dispatch, store) =>
        request.then((response) => {
            dispatch({
                type: GET_REDEMPTION_EXCEL,
                payload: response.data,
            })
            window.open(response.data.filename, "_blank")

        });
}

export function updateRedemption(redemption) {
    const request = axios.put(Constants.BASE_URL + 'api/redemption', redemption);

    return (dispatch) =>
        request.then((response) => {
            console.log(response)
            dispatch({
                type: UPDATE_REDEMPTION,
                payload: response.data,
            })
        });
}
export function uploadExcel(fileName) {
    const request = axios.post(Constants.BASE_URL + 'api/redemption/BulkStatusUpload/', { fileName: fileName });

    var a = (dispatch) =>
        request.then((response) => {
            console.log(response)
            dispatch({
                type: UPLOAD_EXCEL,
                payload: response.data,
            })
            dispatch(getRedemption())

        });

    return a;
}


export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function showLoading() {
    return {
        type: SHOW_LOADING,
    }
}
export function hideLoading() {
    return {
        type: HIDE_LOADING,
    }
}
export function openDownloadDialog() {
    return {
        type: OPEN_DOWNLOAD_DIALOG

    }

}

export function closeDownloadDialog() {
    return {
        type: CLOSE_DOWNLOAD_DIALOG
    }
}



export function openUploadDialog() {
    return {
        type: OPEN_UPLOAD_DIALOG

    }

}

export function closeUploadDialog() {
    return {
        type: CLOSE_UPLOAD_DIALOG
    }
}
