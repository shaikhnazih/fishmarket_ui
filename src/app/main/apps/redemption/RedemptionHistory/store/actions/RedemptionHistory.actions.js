import axios from 'axios';
import * as Constants from 'app/constants'
export const GET_REDEMPTIONHISTORY = '';
export const SET_SEARCH_TEXT = '';


export function getRedemptionHistory(routeParams) {
    const request = axios.post(Constants.BASE_URL + 'api/redemption/redemptionhistory', Constants.listQuery);

    return (dispatch) =>
        request.then((response) => {
            console.log(response)
            dispatch({
                type: GET_REDEMPTIONHISTORY,
                payload: response.data.items,
                routeParams
            })
        });
}

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

