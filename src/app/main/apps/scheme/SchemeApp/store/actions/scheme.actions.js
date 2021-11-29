import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';

export const ADD_SCHEME = "[SCHEME  APP] ADD SCHEME";
export const GET_SCHEMES = "[SCHEME  APP] GET SCHEMES";
export const SET_LIST_QUERY = '[SCHEME  APP] SET_LIST_QUERY';
export const SET_SEARCH_TEXT = '[SCHEME  APP] SET SEARCH TEXT';
export const GET_SCHEME_BY_ID = '[SCHEME  APP] GET SCHEME BY ID TEXT';
export const CLEAR_FORM = '[SCHEME  APP] CLEAR FORM '


export const GET_TRIPS = '[SCHEME  APP] GET TRIPS '



export function addScheme(data) {

    return (dispatch, getState) => {

        const request = axios.post(Constants.BASE_URL + 'api/scheme/', data);
        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_SCHEME
                })
            ]).then(() => {
                console.log(response);
                if (response.data.statusCode == 201) {
                    dispatch(Actions.showMessage({ message: "Something Went Wrong...", variant: 'error' }))

                }
                else {
                    dispatch(Actions.showMessage({ message: "Scheme Added Successfully", variant: 'success' }))

                }
                // dispatch(getSchemes())
            }
            ).catch((error) => {
                console.log('==============scheme add error======================');
                console.log(error);
                console.log('====================================');
                dispatch(Actions.showMessage({ message: "Something Went Wrong...", variant: 'error' }))
            })
        )

    };

}


export function getSchemes() {

    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/scheme/GetList/', getState().schemeApp.scheme.listQuery);
        request.then((response) => {
            console.log(response);
            console.log("response");
            dispatch({
                type: GET_SCHEMES,
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

export function getSchemeById(id) {

    return (dispatch, getState) => {
        const request = axios.get(Constants.BASE_URL + 'api/scheme/' + id);
        request.then((response) => {
            console.log(response);
            console.log("response");
            dispatch({
                type: GET_SCHEME_BY_ID,
                payload: response.data
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


export function clearForm() {
    return {
        type: CLEAR_FORM
    }
}



