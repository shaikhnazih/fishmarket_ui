import axios from 'axios';
import * as Constants from 'app/constants';
import * as Actions from 'app/store/actions';

export const GET_NOTIFICATIONS = '[SETTING_NOTIFICATIONS APP] GET NOTIFICATIONS';
export const SET_SEARCH_TEXT = '[SETTING_NOTIFICATIONS APP] SET SEARCH TEXT';
export const OPEN_NEW_NOTIFICATIONS_DIALOG = '[SETTING_NOTIFICATIONS APP] OPEN NEW NOTIFICATIONS DIALOG';
export const CLOSE_NEW_NOTIFICATIONS_DIALOG = '[SETTING_NOTIFICATIONS APP] CLOSE NEW NOTIFICATIONS DIALOG';
export const OPEN_EDIT_NOTIFICATIONS_DIALOG = '[SETTING_NOTIFICATIONS APP] OPEN EDIT NOTIFICATIONS DIALOG';
export const CLOSE_EDIT_NOTIFICATIONS_DIALOG = '[SETTING_NOTIFICATIONS APP] CLOSE EDIT NOTIFICATIONS DIALOG';
export const ADD_NOTIFICATIONS = '[SETTING_NOTIFICATIONS APP] ADD NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS = '[SETTING_NOTIFICATIONS APP] UPDATE NOTIFICATIONS';
export const REMOVE_NOTIFICATIONS = '[SETTING_NOTIFICATIONS APP] REMOVE NOTIFICATIONS';
export const GET_NOTIFICATIONS_CATEGORY_SELECT = '[GET_NOTIFICATIONS_CATEGORY_SELECT]';


export function getNotificationsSelectOptions() {
    const request = axios.get(Constants.BASE_URL + 'api/Notification/');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_NOTIFICATIONS_CATEGORY_SELECT,
                payload: response
            })
        );
}

export function getNotifications(query) {

    const request = axios.post(Constants.BASE_URL + 'api/Notification/GetNotifications/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_NOTIFICATIONS,
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

export function openNewNotificationsDialog() {
    return {
        type: OPEN_NEW_NOTIFICATIONS_DIALOG
    }
}

export function closeNewNotificationsDialog() {
    return {
        type: CLOSE_NEW_NOTIFICATIONS_DIALOG
    }
}

export function openEditNotificationsDialog(data) {
    return {
        type: OPEN_EDIT_NOTIFICATIONS_DIALOG,
        data
    }
}

export function closeEditNotificationsDialog() {
    return {
        type: CLOSE_EDIT_NOTIFICATIONS_DIALOG
    }
}

export function addNotifications(newNotification) {
    return (dispatch, getState) => {

        const request = axios.post(Constants.BASE_URL + 'api/notification/', newNotification);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_NOTIFICATIONS
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Notification Added Successfully", variant: 'success' }))
                dispatch(getNotifications(Constants.listQuery))
            })
        );
    };
}

export function updateNotifications(notification) {
    return (dispatch, getState) => {

        const request = axios.put(Constants.BASE_URL + 'api/notification', notification);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_NOTIFICATIONS
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Notification Updated Successfully", variant: 'success' }))
                dispatch(getNotifications(Constants.listQuery))
            })
        );
    };
}

export function removeNotifications(NotificationId) {
    return (dispatch, getState) => {

        const request = axios.delete(Constants.BASE_URL + 'api/Notification/' + NotificationId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_NOTIFICATIONS
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: "Notification Deleted Successfully", variant: 'success' }))
                dispatch(getNotifications(Constants.listQuery))
            })
        );
    };
}