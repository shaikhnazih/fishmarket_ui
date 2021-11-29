import axios from 'axios';
import * as Constants from 'app/constants'
export const GET_CATALOGUE = '';
export const ADD_CATALOGUE = '';


export function getCatalogue() {

    const request = axios.get(Constants.BASE_URL + 'api/Catalog/');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_CATALOGUE,
                payload: response.data
            })
        );
}

export function addCatalogue(catalogue) {
    return (dispatch, getState) => {

        const request = axios.post(Constants.BASE_URL + 'api/Catalog', catalogue);

        return request.then((response) =>
            dispatch(getCatalogue())
        );
    };
}
