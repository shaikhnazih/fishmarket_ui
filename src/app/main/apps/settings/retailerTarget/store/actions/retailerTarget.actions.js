import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';
import { useDispatch, useSelector } from 'react-redux';


export const GET_RETAILERTARGET = '[SETTING_RetailerTarget APP] GET GET_RETAILERTARGETS';
export const SET_SEARCH_TEXT = '[SETTING_RETAILERTARGETS APP] SET SEARCH TEXT';
export const RETAILERTARGET_BULK_UPLOAD = '[RETAILERTARGETS_BULK_UPLOAD]';
export const SET_LIST_QUERY = '[SET_LIST_QUERY]';

export const OPEN_UPLOAD_DIALOG = '[TARGET APP] OPEN UPLOAD DIALOG';
export const CLOSE_UPLOAD_DIALOG = '[TARGET APP] CLOSE UPLOAD DIALOG';

export const SHOW_LOADING = 'TARGET SHOW LOADING';
export const HIDE_LOADING = 'TARGET HIDE LOADING';



export const GET_SCHEMES = 'TARGET GET SCHEMES';




export function retailerTargetBulkUpload(fileName, selectedScheme) {

    const request = axios.post(Constants.BASE_URL + 'api/retailerTarget/BulkUpload/', { fileName: fileName, schemeId: selectedScheme });
    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: RETAILERTARGET_BULK_UPLOAD,
                    payload: response.data
                })
            ]).then(() => {
                //   dispatch(Actions.showMessage({ message: "Bulk Upload Success.", variant: 'success' }))
                dispatch(getRetailerTarget())
            })
        );
}


export function getRetailerTarget() {

    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/RetailerTarget/GetList', getState().retailerTargetApp.retailerTargets.listQuery);
        request.then((response) => {
            console.log(response);
            console.log("response");
            dispatch({
                type: GET_RETAILERTARGET,
                payload: response.data
            })
        });
    }
}

export function getSchemes() {

    return (dispatch, getState) => {
        var listq = getState().retailerTargetApp.retailerTargets.listQuery;
        listq.pageSize = 10000;
        listq.parameters = [{ name: 'unsetteledonly', value: 'true' }]

        const request = axios.post(Constants.BASE_URL + 'api/Scheme/GetList', listq);
        request.then((response) => {

            dispatch({
                type: GET_SCHEMES,
                payload: response.data.items
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
