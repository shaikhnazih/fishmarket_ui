import axios from 'axios';
import * as Constants from 'app/constants'

export const GET_PROJECTS = '[PROJECT DASHBOARD APP] GET PROJECTS';

export function getProjects() {
    // const request = axios.get('/api/project-dashboard-app/projects');
    const request = axios.get(Constants.BASE_URL + 'api/dashboard/');
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PROJECTS,
                payload: response.data
            })
        );
}
