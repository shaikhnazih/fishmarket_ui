import axios from 'axios';
import * as Constants from 'app/constants'
export const GET_PRODUCT_LINE_MASTER = 'GET_PRODUCT_LINE_MASTER';
export const GET_DIST_GROUPS_MASTER = 'GET_DIST_GROUPS_MASTER';
export const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES';
export const GET_PRODUCT_SUB_CATEGORIES = 'GET_PRODUCT_SUB_CATEGORIES';

export const GET_PRODUCTS = 'GET_PRODUCTS';


export function getProductLineMaster() {
    let query = { type: 'prodline' }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCT_LINE_MASTER,
                payload: response.data
            })
        );
}

export function getDistGroupMaster() {
    let query = { type: 'distributorGroups' }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_DIST_GROUPS_MASTER,
                payload: response.data
            })
        );
}

export function getProductCategories(prodlineCode) {
    let query = { type: 'product', get: 'categories', filterBy: prodlineCode }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCT_CATEGORIES,
                payload: response.data
            })
        );
}

export function getProductSubCategories(categories) {
    let query = { type: 'product', get: 'subcategories', filterBy: categories }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCT_SUB_CATEGORIES,
                payload: response.data
            })
        );
}


export function getProducts(subcategories) {
    let query = { type: 'product', get: 'products', filterBy: subcategories }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCTS,
                payload: response.data
            })
        );
}
