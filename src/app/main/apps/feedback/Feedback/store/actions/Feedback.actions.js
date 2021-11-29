import axios from 'axios';
import * as Constants from 'app/constants'
export const GET_FEEDBACK = '[GET_FEEDBACK';
export const SET_SEARCH_TEXT = '[SET_SEARCH_TEXT]';
export const SET_LIST_QUERY = '[SET_LIST_QUERY]';


export function getFeedback(routeParams) {

    return (dispatch, getState) => {
        const request = axios.post(Constants.BASE_URL + 'api/Feedback/GetFeedbacks', getState().FeedbackApp.Feedback.listQuery);
        request.then((response) => {
            dispatch({
                type: GET_FEEDBACK,
                payload: response.data
            })
        });
    }
}

export function setSearchText(text) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: text
    }
}

export function setListQuery(query) {
    return {
        type: SET_LIST_QUERY,
        payLoad: query
    }
}