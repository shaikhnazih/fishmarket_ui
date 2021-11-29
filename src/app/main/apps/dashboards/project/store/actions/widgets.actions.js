import axios from 'axios';
import * as Constants from 'app/constants'

export const GET_WIDGETS = 'WIDGETS';
export const GET_WIDGETS1 = 'WIDGETS1';


export function getWidgets() {
    const request = axios.get(Constants.BASE_URL + 'api/dashboard/');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_WIDGETS,
                payload: response.data
            })
        );
}

export function getWidgets1() {
    const request = axios.get('/api/project-dashboard-app/widgets');
    return (dispatch) =>
        request.then((response) => {
            console.log(response);
            dispatch({
                type: GET_WIDGETS1,
                payload: response.data
            })
        });
}


