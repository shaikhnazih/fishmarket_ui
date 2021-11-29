import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';

export const GET_USERS = '[SETTING_USER APP] GET USERS';
export const UPDATE_USER = '[SETTING_USER APP] UPDATE_USER';
export const RESET_PASSWORD = '[SETTING_USER APP] RESET PASSWORD';
export const RESET_MEMBER = '[SETTING_USER APP] RESET MEMBER';
export const GET_IS_USERNAME_EXISTS = '[SETTING_USER APP] GET IS USERNAME EXISTS';
export const SET_SEARCH_TEXT = '[SETTING_USER APP] SET SEARCH TEXT';
export const OPEN_NEW_USER_DIALOG = '[SETTING_USER APP] OPEN NEW USER DIALOG';
export const CLOSE_NEW_USER_DIALOG = '[SETTING_USER APP] CLOSE NEW USER DIALOG';
export const OPEN_EDIT_USER_DIALOG = '[SETTING_USER APP] OPEN EDIT USER DIALOG';
export const CLOSE_EDIT_USER_DIALOG = '[SETTING_USER APP] CLOSE EDIT USER DIALOG';
export const ADD_USER = '[SETTING_USER APP] ADD USER';
export const REMOVE_USER = '[SETTING_USER APP] REMOVE USER';
export const REMOVE_USERS = '[SETTING_USER APP] REMOVE USERS';
export const GET_USERS_ROLES = '[GET_USERS_ROLES]';
export const USER_BULK_UPLOAD = '[USER_BULK_UPLOAD]';
export const OPEN_RESETPASSWORD_USER_DIALOG = '[SETTING_USER APP] OPEN RESETPASSWORD USER DIALOG';
export const CLOSE_RESETPASSWORD_DIALOG = '[SETTING_USER APP] CLOSE RESETPASSWORD DIALOG';
export const SET_LIST_QUERY = '[SET_LIST_QUERY]';





export function userBulkUpload(fileName) {
    const request = axios.post(Constants.BASE_URL + 'api/users/BulkUpload/', { fileName: fileName });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: USER_BULK_UPLOAD,
                payload: response
            })
        );
}

export function getUserRolesSelectOptions() {
    const request = axios.get(Constants.BASE_URL + 'api/users/getroles');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_USERS_ROLES,
                payload: response
            })
        );
}

export function getUsers() {


    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/Users/', getState().usersApp.user.listQuery);
        request.then((response) => {
            dispatch({
                type: GET_USERS,
                payload: response.data
            })
        });
    }

}
export function isUsernameExists(username) {

    const request = axios.get(Constants.BASE_URL + 'api/Users/isuserexists/' + username);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_IS_USERNAME_EXISTS,
                payload: response.data
            })
        });
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

export function openNewUserDialog() {

    return {
        type: OPEN_NEW_USER_DIALOG
    }
}

export function closeNewUserDialog() {
    return {
        type: CLOSE_NEW_USER_DIALOG
    }
}

export function openEditUserDialog(data) {
    return {
        type: OPEN_EDIT_USER_DIALOG,
        data
    }
}

export function closeEditUserDialog() {
    return {
        type: CLOSE_EDIT_USER_DIALOG
    }
}

export function openResetPasswordDialog(data) {
    return {
        type: OPEN_RESETPASSWORD_USER_DIALOG,
        data
    }
}

export function closeResetPasswordDialog() {
    return {
        type: CLOSE_RESETPASSWORD_DIALOG
    }
}


export function addUser(newUser) {
    return (dispatch, getState) => {

        const request = axios.post(Constants.BASE_URL + 'api/users/addUser', newUser);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_USER
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
                dispatch(getUsers(Constants.listQuery))
            })
        );
    };
}

export function resetPassword(passwordmodel) {


    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/users/resetUserPassword/' + passwordmodel.username, passwordmodel);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: RESET_PASSWORD
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
                dispatch(getUsers())
            })
        )
    };
}

export function resetMember(user) {


    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/users/resetMemeber/', user);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: RESET_MEMBER
                })
            ]).then(() => {
                dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
                dispatch(getUsers())
            })
        )
    };
}




export function updateUser(user) {
    return (dispatch, getState) => {

        const request = axios.put(Constants.BASE_URL + 'api/Users/' + user.id, user);
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_USER
                })
            ]).then(() => {
                console.log()
                dispatch(Actions.showMessage({ message: response.data.message, variant: 'success' }))
                dispatch(getUsers())
            }
            )
        )
    };
}




// export function uploadFile(file) {

//     console.log('in uploadFile action');
//     console.log(file);
//     return (dispatch, getState) => {

//         const { routeParams } = getState().usersApp.users;
//         const request = axios.post(Constants.BASE_URL + 'api/File/', file);

//         return request.then((response) =>
//         dispatch({
//             type: UPLOAD_FILE,
//             payload: response.data.fileName,
//         })
//         );
//     };
// }


export function removeUser(userId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().usersApp.user;

        const request = axios.delete(Constants.BASE_URL + 'api/users/' + userId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_USER
                })
            ]).then(() => dispatch(getUsers()))
        );
    };
}

export function removeUsers(userIds) {
    return (dispatch, getState) => {

        const { routeParams } = getState().usersApp.users;

        const request = axios.post('/api/users-app/remove-users', {
            userIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_USERS
                }),
                dispatch({
                    type: null
                })
            ]).then(() => dispatch(getUsers()))
        );
    };
}

//export function toggleStarredUser(userId)
//{
//    return (dispatch, getState) => {
//        const {routeParams} = getState().usersApp.users;

//        const request = axios.post('/api/users-app/toggle-starred-user', {
//            userId
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: TOGGLE_STARRED_USER
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getUsers(routeParams)))
//        );
//    };
//}

//export function toggleStarredUsers(userIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().usersApp.users;

//        const request = axios.post('/api/users-app/toggle-starred-users', {
//            userIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: TOGGLE_STARRED_USERS
//                }),
//                dispatch({
//                    type: DESELECT_ALL_USERS
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getUsers(routeParams)))
//        );
//    };
//}

//export function setUsersStarred(userIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().usersApp.users;

//        const request = axios.post('/api/users-app/set-users-starred', {
//            userIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: SET_USERS_STARRED
//                }),
//                dispatch({
//                    type: DESELECT_ALL_USERS
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getUsers(routeParams)))
//        );
//    };
//}

//export function setUsersUnstarred(userIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().usersApp.users;

//        const request = axios.post('/api/users-app/set-users-unstarred', {
//            userIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: SET_USERS_STARRED
//                }),
//                dispatch({
//                    type: DESELECT_ALL_USERS
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getUsers(routeParams)))
//        );
//    };
//}
