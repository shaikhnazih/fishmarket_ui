import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';
import * as rootActions from 'app/store/actions';

export const ADD_REPORT = "[REPORT  APP] ADD REPORT";
export const GET_REPORT_TYPES = "[report  APP] GET REPORT TYPES";
export const SET_LIST_QUERY = '[REPORT  APP] SET_LIST_QUERY';
export const SET_SEARCH_TEXT = '[REPORT  APP] SET SEARCH TEXT';
export const GET_REPORT_BY_ID = '[REPORT  APP] GET REPORT BY ID TEXT';
export const CLEAR_FORM = '[report  APP] CLEAR FORM '

export const GET_TRIPS = '[report  APP] GET TRIPS '
export const GET_DATA = '[report] GET DATA';
export const GET_FILTER_BRANCHES = '[report] GET BRANCHES';
export const GET_REPORT_SCHEMA = '[report] GET REPORT SCHEMA';


export function getReportSchema(reportTypeCode) {
    const request = axios.post(Constants.BASE_URL + 'api/Report/getRerportPackage', reportTypeCode, { 'content-type': 'application/json' });
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_REPORT_SCHEMA,
                payload: response.data
            })
        );

}



export function getReportTypes() {

    return (dispatch, getState) => {
        const request = axios.get(Constants.BASE_URL + 'api/Report/GetReoprtTypes?moduleName=' + "Report");

        request.then((response) => {

            dispatch({
                type: GET_REPORT_TYPES,
                payload: response.data
            })
        });
    }
}


export function getTrips() {

    return (dispatch, getState) => {

        var query = Constants.listQuery;
        query.queryType = 'trip';
        const request = axios.post(Constants.BASE_URL + 'api/gift/GetList/', query);
        request.then((response) => {
            console.log(response);
            console.log("respnse from Gettrip");
            dispatch({
                type: GET_TRIPS,
                payload: response.data
            })
        });
    }
}

export function getReportById(id) {

    return (dispatch, getState) => {
        const request = axios.get(Constants.BASE_URL + 'api/report/' + id);
        request.then((response) => {
            console.log(response);
            console.log("response");
            dispatch({
                type: GET_REPORT_BY_ID,
                payload: response.data
            })
        });
    }


}


export function downloadExcel(data) {

    const request = axios.post(Constants.BASE_URL + 'api/report/download/', data);
    return (dispatch) =>
        request.then((response) => {
            if (response.data.status == 'success') {

                dispatch(rootActions.showMessage({ message: response.data.message, variant: 'success' }))
                window.open(response.data.filename, "_blank")
            }
            else {
                dispatch(rootActions.showMessage({ message: response.data.message, variant: 'error' }))

            }
        });
}
export function exportToExcel(params) {
    const request = axios.post(Constants.BASE_URL + 'api/Report/exportReportToCSV', params, { 'content-type': 'application/json' });
    return (dispatch) =>
        request.then((response) => {
            if (response.data) {
                // dispatch(rootActions.showMessage({ message: response.data.message, variant: 'success' }))
                window.open(response.data, "_blank")
            }
        }
        );

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


export function clearForm() {
    return {
        type: CLEAR_FORM
    }
}


