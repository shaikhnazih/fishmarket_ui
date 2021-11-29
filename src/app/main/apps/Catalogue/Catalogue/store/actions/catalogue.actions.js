import axios from 'axios';
import * as Constants from 'app/constants'
import * as Actions from 'app/store/actions';
export const GET_CATALOGUE = '';
export const ADD_CATALOGUE = '';


export function getCatalogue() {

    const request = axios.get(Constants.BASE_URL + 'api/Catalog/GetList');
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

        return request.then((response) => {
            dispatch(Actions.showMessage({ message: 'Catalogue uploaded Successfully.', variant: 'success' }))
            dispatch(getCatalogue())

        }
        );
    };
}

export function deleteCatalogue(id) {
    return (dispatch, getState) => {
        const request = axios.delete(Constants.BASE_URL + 'api/Catalog/' + id);
        return request.then((response) => {
            dispatch(Actions.showMessage({ message: 'Catalogue deleted successfully.', variant: 'success' }))
            dispatch(getCatalogue())
        }

        );
    };
}
