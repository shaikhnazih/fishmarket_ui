import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';

export const GET_WORKFLOW_TASKS = '[PROJECT DASHBOARD APP] GET WORKFLOW_TASKS';


export const OPEN_PROFILE_CHANGE_DIALOG = '[WORKFLOW APP] OPEN PROFILE CHANGE DIALOG';
export const CLOSE_PROFILE_CHANGE_DIALOG = '[WORKFLOW APP] CLOSE PROFILE CHANGE  DIALOG';


export const OPEN_ENROLLMENT_DIALOG = '[WORKFLOW APP] OPEN ENROLLMENT DIALOG';
export const CLOSE_ENROLLMENT_DIALOG = '[WORKFLOW APP] CLOSE ENROLLMENT DIALOG';


export const OPEN_SCHEME_APPROVAL_DIALOG = '[WORKFLOW APP] OPEN SCHEME APPROVAL DIALOG';
export const CLOSE_SCHEME_APPROVAL_DIALOG = '[WORKFLOW APP] CLOSE SCHEME APPROVAL  DIALOG';

export const GET_ASSOCIATE_ADD_REQUEST = '[WORKFLOW APP] GET ASSOCIATE ADD REQUEST';
export const UPDATE_ASSOCIATE_WORKFLOW = '[WORKFLOW APP] UPDATE ASSOCIATE WORKFLOW';

export const GET_PROFILE_UPDATE_REQUEST = '[WORKFLOW APP] GET PROFILE UPDATE REQUEST';
export const UPDATE_PROFILE_UPDATE_WORKFLOW = '[WORKFLOW APP] UPDATE PROFILE-UPDATE WORKFLOW';


export function getWorkflowTasks() {
    // const request = axios.get('/api/project-dashboard-app/projects');
    const request = axios.post(Constants.BASE_URL + 'api/WorkflowTask/getPendingTasks')  //axios.get('/api/project-dashboard-app/projects');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_WORKFLOW_TASKS,
                payload: response.data
            })
        );
}


export function updateAssociateWorkflow(data) {
    // const request = axios.get('/api/project-dashboard-app/projects');
    const request = axios.post(Constants.BASE_URL + 'api/Enrollment/updateAssociateWorkflow', data)  //axios.get('/api/project-dashboard-app/projects');

    return (dispatch) =>
        request.then((response) =>
            // dispatch({
            //     type: UPDATE_ASSOCIATE_WORKFLOW,
            //     payload: response.data
            // })

            Promise.all([
                dispatch({
                    type: UPDATE_ASSOCIATE_WORKFLOW,
                    payload: response.data
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Approved Successfully", variant: 'success' }))
                dispatch(closeEnrollmentDialog())
            })

        );



}

export function getAssociateAddRequest(wfTaskId) {
    // const request = axios.get('/api/project-dashboard-app/projects');
    const request = axios.post(Constants.BASE_URL + 'api/Enrollment/getAssociateAddRequest?wfTaskId=' + wfTaskId, {})  //axios.get('/api/project-dashboard-app/projects');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ASSOCIATE_ADD_REQUEST,
                payload: response.data
            })
        );
}


export function getUpdateProfileRequest(wfTaskId) {
    const request = axios.post(Constants.BASE_URL + 'api/Membership/getUpdateProfileRequest?wfTaskId=' + wfTaskId, {})  //axios.get('/api/project-dashboard-app/projects');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PROFILE_UPDATE_REQUEST,
                payload: response.data
            })
        );
}

export function updateProfileWorkflow(data) {
    const request = axios.post(Constants.BASE_URL + 'api/Membership/updateProfileWorkflow', data)  //axios.get('/api/project-dashboard-app/projects');

    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_PROFILE_UPDATE_WORKFLOW,
                    payload: response.data
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Approved Successfully", variant: 'success' }))
                dispatch(closeEnrollmentDialog())
            })
        );
}




export function openProfileChangeDialog(data) {
//    alert(data)
    return {
        type: OPEN_PROFILE_CHANGE_DIALOG,
        wfTaskId: data
    }

}

export function closeProfileChangeDialog() {
    return {
        type: CLOSE_PROFILE_CHANGE_DIALOG
    }
}

export function openEnrollmentDialog(wfTaskId) {
    return {
        type: OPEN_ENROLLMENT_DIALOG,
        wfTaskId: wfTaskId
    }

}

export function closeEnrollmentDialog() {
    return {
        type: CLOSE_ENROLLMENT_DIALOG
    }
}

export function openSchemeApprovalDialog(data) {
    return {
        type: OPEN_SCHEME_APPROVAL_DIALOG,
        data
    }

}

export function closeSchemeApprovalDialog() {
    return {
        type: CLOSE_SCHEME_APPROVAL_DIALOG
    }
}

