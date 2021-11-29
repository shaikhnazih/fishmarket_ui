import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';

export const GET_DATA = '[SUMMARY] GET DATA';
export const GET_FILTER_BRANCHES = '[SUMMARY] GET BRANCHES';
export const GET_REPORT_SCHEMA = '[SUMMARY] GET REPORT SCHEMA';
export const GET_DASHBOARD_REPORT_TYPES = "SUMMARY GET DASHBOARD REPORT TYPES"

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


export function getDashboardReportTypes() {
    const request = axios.get(Constants.BASE_URL + 'api/Report/GetReoprtTypes?moduleName=' + "Dashboard");
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_DASHBOARD_REPORT_TYPES,
                payload: response.data
            })
        );

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


export function getReportData(params) {
    const request = axios.post(Constants.BASE_URL + 'api/Report/fetchReportData', params, { 'content-type': 'application/json' });
    return (dispatch) =>
        request.then((response) => {
            if (response.data && response.data.jsonData) {
                response.data.data = JSON.parse(response.data.jsonData)
                dispatch({
                    type: GET_DATA,
                    payload: response.data.data
                })

            }
        });

}


export function getData2(parameters) {
    // const request = axios.get('/api/project-dashboard-app/projects');
    const request = axios.post(Constants.BASE_URL + 'api/WorkflowTask/getPendingTasks', parameters)  //axios.get('/api/project-dashboard-app/projects');

    //return (dispatch) =>
    //    request.then((response) =>
    //        dispatch({
    //            type: GET_WORKFLOW_TASKS,
    //            payload: response.data
    //        })
    //    );

    //    alert('hiii')
    return (dispatch) =>
        dispatch({
            type: GET_DATA,
            payload: {
                header: null,
                detail: [
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 },
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 },
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 },
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 },
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 },
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 },
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 },
                    { regionName: 'West', branchName: 'Mumbai', tmName: 'Deepak', distributorName: 'Agarwar traders', memberName: 'Super Electricals', totalMOUs: 80000, achieveMOUs: 20000 }
                ]
            }
        })
}


export function getData(parameters) {
    // const request = axios.get('/api/project-dashboard-app/projects');
    const request = axios.post(Constants.BASE_URL + 'api/WorkflowTask/getPendingTasks', parameters)  //axios.get('/api/project-dashboard-app/projects');

    //return (dispatch) =>
    //    request.then((response) =>
    //        dispatch({
    //            type: GET_WORKFLOW_TASKS,
    //            payload: response.data
    //        })
    //    );

    //    alert('hiii')
    return (dispatch) =>
        dispatch({
            type: GET_DATA,
            payload: {
                header: { totalNoOfRetailers: 100, enrolled: 70 },
                detail: [{ schemeName: 'Scheme 1', noOfMembers: 50 },
                { schemeName: 'Scheme 2', noOfMembers: 50 },
                { schemeName: 'Scheme 3', noOfMembers: 50 },
                { schemeName: 'Scheme 4', noOfMembers: 50 },
                { schemeName: 'Scheme 5', noOfMembers: 50 },
                ]
            }
        })
}


export function getBranchesForRegions(regions, divisioncode) {
    let query = { type: 'hierarchy', get: 'Branch', filterBy: 'Region', filterValue: regions, division: divisioncode }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_FILTER_BRANCHES,
                payload: response.data.items
            })
        );
}
