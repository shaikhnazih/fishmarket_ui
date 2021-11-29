import axios from 'axios';
import * as Constants from 'app/constants';
import * as Actions from 'app/store/actions';
import store from '../reducers';

export const GET_PROFILE = '[GET_PROFILE APP] GET_PROFILE';
export const UPDATE_PROFILE = '[UPDATE_PROFILE APP] UPDATE_PROFILE';
export const UPDATE_PASSWORD = '[UPDATE_PASSWORD APP] UPDATE_PASSWORD';

export function getProfile() {
    const request = axios.get(Constants.BASE_URL + 'api/users/getUserProfile');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PROFILE,
                payload: response.data
            })
        );
}

export function updateProfile(data) {
    const request = axios.put(Constants.BASE_URL + 'api/users/' + data.id, data);
    return (dispatch) =>
        request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: response.data.items
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Profile Updated Sucessfully", variant: 'success' }))
                dispatch(getProfile())
            })
        );
}

export function updatePassword(data, username) {
    const request = axios.post(Constants.BASE_URL + 'api/users/changepassword/' + username, data);
    return (dispatch) =>
        request.then((response) => {
            dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
        }
        );
}