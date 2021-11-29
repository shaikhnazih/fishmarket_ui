import axios from 'axios';
import * as Constants from 'app/constants'

export const GET_RETAILERS_FOR_DISTRIBUTORS = 'GET_RETAILERS_FOR_DISTRIBUTORS';
export const GET_DISTRIBUTORS_FOR_TERRITORIES = 'GET_DISTRIBUTORS_FOR_TERRITORIES';
export const GET_TERRITORIES_FOR_BRANCHES = 'GET_TERRITORIES_FOR_BRANCHES';
export const GET_BASE_HIERARCHY = 'GET_BASE_HIERARCHY';
export const GET_REGIONS = 'GET_REGIONS';
export const GERT_BRANCHS = 'GERT_BRANCHS';


export function getRetailersForDistributors(distributors) {
    let query = { type: 'hierarchy', get: 'RetailerMember', filterBy: 'Distributor', filterValue: distributors, division: '' }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_RETAILERS_FOR_DISTRIBUTORS,
                payload: response.data.items
            })
        );
}

export function getDistributorsForTerritories(territories, type) {
    let query = { type: 'hierarchy', get: type, filterBy: 'TSM', filterValue: JSON.stringify(territories), division: '' }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_DISTRIBUTORS_FOR_TERRITORIES,
                payload: response.data
            })
        );
}




export function getBranchesForRegions(regions, divisioncode) {
    let query = { type: 'hierarchy', get: 'Branch', filterBy: 'Region', filterValue: JSON.stringify(regions), division: divisioncode }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GERT_BRANCHS,
                payload: response.data.items
            })
        );
}

export function getTerritoriesForBranches(branches, divisioncode) {

    let query = { type: 'hierarchy', get: 'territory', filterBy: 'Branch', filterValue: JSON.stringify(branches), division: divisioncode }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TERRITORIES_FOR_BRANCHES,
                payload: response.data.items
            })
        );
}

export function getBaseHierarchy() {

    let data = {};

    let query = { type: 'hierarchy', get: 'regions', filterBy: '' }
    const requestrsm = axios.post(Constants.BASE_URL + 'api/Master/', query);

    query = { type: 'hierarchy', get: 'branches', filterBy: '' }
    const requestbranch = axios.post(Constants.BASE_URL + 'api/Master/', query);


    query = { type: 'hierarchy', get: 'areas', filterBy: '' }
    const requestarea = axios.post(Constants.BASE_URL + 'api/Master/', query);

    return (dispatch) =>
        Promise.all([requestrsm, requestbranch, requestarea]).then((values) => {
            data.regions = values[0].data.items;
            data.branches = values[1].data.items;
            data.areas = values[2].data.items;

            dispatch({
                type: GET_BASE_HIERARCHY,
                payload: data
            })
        })

}

export function getRegions() {



    let query = { type: 'hierarchy', get: 'Region', filterBy: '', filterValue: '', division: '' }
    const request = axios.post(Constants.BASE_URL + 'api/Master/', query);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_REGIONS,
                payload: response.data.items
            })
        );
}








