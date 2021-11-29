import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';

export const GET_PROFILEAPPROVALS = '[SETTING_PROFILEAPPROVAL APP] GET PROFILEAPPROVALS';
export const UPDATE_PROFILEAPPROVAL = '[SETTING_PROFILEAPPROVAL APP] UPDATE_PROFILEAPPROVAL';
export const RESET_PASSWORD = '[SETTING_PROFILEAPPROVAL APP] RESET PASSWORD';
export const GET_IS_PROFILEAPPROVALNAME_EXISTS = '[SETTING_PROFILEAPPROVAL APP] GET IS PROFILEAPPROVALNAME EXISTS';
export const SET_SEARCH_TEXT = '[SETTING_PROFILEAPPROVAL APP] SET SEARCH TEXT';
export const OPEN_NEW_PROFILEAPPROVAL_DIALOG = '[SETTING_PROFILEAPPROVAL APP] OPEN NEW PROFILEAPPROVAL DIALOG';
export const CLOSE_NEW_PROFILEAPPROVAL_DIALOG = '[SETTING_PROFILEAPPROVAL APP] CLOSE NEW PROFILEAPPROVAL DIALOG';
export const OPEN_EDIT_PROFILEAPPROVAL_DIALOG = '[SETTING_PROFILEAPPROVAL APP] OPEN EDIT PROFILEAPPROVAL DIALOG';
export const CLOSE_EDIT_PROFILEAPPROVAL_DIALOG = '[SETTING_PROFILEAPPROVAL APP] CLOSE EDIT PROFILEAPPROVAL DIALOG';
export const ADD_PROFILEAPPROVAL = '[SETTING_PROFILEAPPROVAL APP] ADD PROFILEAPPROVAL';
export const REMOVE_PROFILEAPPROVAL = '[SETTING_PROFILEAPPROVAL APP] REMOVE PROFILEAPPROVAL';
export const REMOVE_PROFILEAPPROVALS = '[SETTING_PROFILEAPPROVAL APP] REMOVE PROFILEAPPROVALS';
export const GET_PROFILEAPPROVALS_ROLES = '[GET_PROFILEAPPROVALS_ROLES]';
export const PROFILEAPPROVAL_BULK_UPLOAD = '[PROFILEAPPROVAL_BULK_UPLOAD]';
export const OPEN_RESETPASSWORD_PROFILEAPPROVAL_DIALOG = '[SETTING_PROFILEAPPROVAL APP] OPEN RESETPASSWORD PROFILEAPPROVAL DIALOG';
export const CLOSE_RESETPASSWORD_DIALOG = '[SETTING_PROFILEAPPROVAL APP] CLOSE RESETPASSWORD DIALOG';


export function getProfileApproval(query) {

    const request = axios.post(Constants.BASE_URL + 'api/ProfileApproval/', query);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_PROFILEAPPROVALS,
                payload: response.data
            })
        });
}
export function isProfileApprovalnameExists(profileapprovalname) {

    const request = axios.get(Constants.BASE_URL + 'api/ProfileApproval/isprofileapprovalexists/' + profileapprovalname);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_IS_PROFILEAPPROVALNAME_EXISTS,
                payload: response.data
            })
        });
}
export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}
export function openResetPasswordDialog(data) {
    return {
        type: OPEN_RESETPASSWORD_PROFILEAPPROVAL_DIALOG,
        data
    }
}
export function closeResetPasswordDialog() {
    return {
        type: CLOSE_RESETPASSWORD_DIALOG
    }
}
export function addProfileApproval(newProfileApproval) {
    return (dispatch, getState) => {

        const request = axios.post(Constants.BASE_URL + 'api/profileapprovals/addProfileApproval', newProfileApproval);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_PROFILEAPPROVAL
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
                dispatch(getProfileApproval(Constants.listQuery))
            })
        );
    };
}
export function resetPassword(passwordmodel) {


    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/profileapprovals/resetProfileApprovalPassword/' + passwordmodel.profileapprovalname, passwordmodel);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: RESET_PASSWORD
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
                dispatch(getProfileApproval(Constants.listQuery))
            })
        )
    };
}
export function updateProfileApproval(profileapproval) {
    return (dispatch, getState) => {

        const request = axios.put(Constants.BASE_URL + 'api/ProfileApproval/' + profileapproval.id, profileapproval);
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_PROFILEAPPROVAL
                })
            ]).then(() => {
                console.log()
                dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
                dispatch(getProfileApproval(Constants.listQuery))
            }
            )
        )
    };
}
export function removeProfileApproval(profileapprovalId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().profileapprovalsApp.profileapprovals;

        const request = axios.delete(Constants.BASE_URL + 'api/profileapprovals/' + profileapprovalId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PROFILEAPPROVAL
                })
            ]).then(() => dispatch(getProfileApproval(Constants.listQuery)))
        );
    };
}