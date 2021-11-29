import axios from 'axios';
import * as Constants from 'app/constants'

export const GET_SCHEMES = '[PLANNING_SCHEME APP] GET SCHEMES';
export const SET_SEARCH_TEXT = '[PLANNING_SCHEME APP] SET SEARCH TEXT';
//export const TOGGLE_IN_SELECTED_SCHEME = '[PLANNING_SCHEME APP] TOGGLE IN SELECTED SCHEMES';
//export const SELECT_ALL_SCHEME = '[PLANNING_SCHEME APP] SELECT ALL SCHEMES';
//export const DESELECT_ALL_SCHEME = '[PLANNING_SCHEME APP] DESELECT ALL SCHEMES';
export const OPEN_NEW_SCHEME_DIALOG = '[PLANNING_SCHEME APP] OPEN NEW SCHEME DIALOG';
export const CLOSE_NEW_SCHEME_DIALOG = '[PLANNING_SCHEME APP] CLOSE NEW SCHEME DIALOG';
export const OPEN_EDIT_SCHEME_DIALOG = '[PLANNING_SCHEME APP] OPEN EDIT SCHEME DIALOG';
export const CLOSE_EDIT_SCHEME_DIALOG = '[PLANNING_SCHEME APP] CLOSE EDIT SCHEME DIALOG';
export const ADD_SCHEME = '[PLANNING_SCHEME APP] ADD SCHEME';
export const UPDATE_SCHEME = '[PLANNING_SCHEME APP] UPDATE SCHEME';
export const REMOVE_SCHEME = '[PLANNING_SCHEME APP] REMOVE SCHEME';
export const REMOVE_SCHEMES = '[PLANNING_SCHEME APP] REMOVE SCHEMES';
//export const TOGGLE_STARRED_SCHEME = '[PLANNING_SCHEME APP] TOGGLE STARRED SCHEME';
//export const TOGGLE_STARRED_SCHEME = '[PLANNING_SCHEME APP] TOGGLE STARRED SCHEMES';
//export const SET_SCHEME_STARRED = '[PLANNING_SCHEME APP] SET SCHEMES STARRED ';

export function getSchemes(routeParams) {
    const request = axios.get(Constants.BASE_URL + 'api/scheme/', {
        params: routeParams
    });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_SCHEMES,
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

//export function toggleInSelectedSchemes(schemeId)
//{
//    return {
//        type: TOGGLE_IN_SELECTED_SCHEME,
//        schemeId
//    }
//}

//export function selectAllSchemes()
//{
//    return {
//        type: SELECT_ALL_SCHEME
//    }
//}

//export function deSelectAllSchemes()
//{
//    return {
//        type: DESELECT_ALL_SCHEME
//    }
//}

export function openNewSchemeDialog() {
    return {
        type: OPEN_NEW_SCHEME_DIALOG
    }
}

export function closeNewSchemeDialog() {
    return {
        type: CLOSE_NEW_SCHEME_DIALOG
    }
}

export function openEditSchemeDialog(data) {
    return {
        type: OPEN_EDIT_SCHEME_DIALOG,
        data
    }
}

export function closeEditSchemeDialog() {
    return {
        type: CLOSE_EDIT_SCHEME_DIALOG
    }
}

export function addScheme(newScheme) {
    return (dispatch, getState) => {

        const { routeParams } = getState().schemeApp.schemes;
        newScheme.maxQuantity = parseInt(newScheme.maxQuantity);
        newScheme.points = parseInt(newScheme.points);
        const request = axios.post(Constants.BASE_URL + 'api/scheme', newScheme);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_SCHEME
                })
            ]).then(() => dispatch(getSchemes(routeParams)))
        );
    };
}

export function updateScheme(scheme) {
    return (dispatch, getState) => {

        const { routeParams } = getState().schemeApp.schemes;

        const request = axios.post('/api/scheme/update-scheme', {
            scheme
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_SCHEME
                })
            ]).then(() => dispatch(getSchemes(routeParams)))
        );
    };
}

export function removeScheme(schemeId) {
    return (dispatch, getState) => {

        const { routeParams } = getState().schemeApp.schemes;

        const request = axios.post('/api/scheme/remove-scheme', {
            schemeId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_SCHEME
                })
            ]).then(() => dispatch(getSchemes(routeParams)))
        );
    };
}


export function removeSchemes(schemeIds) {
    return (dispatch, getState) => {

        const { routeParams } = getState().schemeApp.schemes;

        const request = axios.post('/api/scheme/remove-schemes', {
            schemeIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_SCHEME
                }),
                dispatch({
                    type: null
                })
            ]).then(() => dispatch(getSchemes(routeParams)))
        );
    };
}

//export function toggleStarredScheme(schemeId)
//{
//    return (dispatch, getState) => {
//        const {routeParams} = getState().schemeApp.schemes;

//        const request = axios.post('/api/schemes-app/toggle-starred-scheme', {
//            schemeId
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: TOGGLE_STARRED_SCHEME
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getSchemes(routeParams)))
//        );
//    };
//}

//export function toggleStarredSchemes(schemeIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().schemeApp.schemes;

//        const request = axios.post('/api/schemes-app/toggle-starred-schemes', {
//            schemeIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: TOGGLE_STARRED_SCHEME
//                }),
//                dispatch({
//                    type: DESELECT_ALL_SCHEME
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getSchemes(routeParams)))
//        );
//    };
//}

//export function setSchemesStarred(schemeIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().schemeApp.schemes;

//        const request = axios.post('/api/schemes-app/set-schemes-starred', {
//            schemeIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: SET_SCHEME_STARRED
//                }),
//                dispatch({
//                    type: DESELECT_ALL_SCHEME
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getSchemes(routeParams)))
//        );
//    };
//}

//export function setSchemesUnstarred(schemeIds)
//{
//    return (dispatch, getState) => {

//        const {routeParams} = getState().schemeApp.schemes;

//        const request = axios.post('/api/schemes-app/set-schemes-unstarred', {
//            schemeIds
//        });

//        return request.then((response) =>
//            Promise.all([
//                dispatch({
//                    type: SET_SCHEME_STARRED
//                }),
//                dispatch({
//                    type: DESELECT_ALL_SCHEME
//                }),
//                dispatch(getUserData())
//            ]).then(() => dispatch(getSchemes(routeParams)))
//        );
//    };
//}
