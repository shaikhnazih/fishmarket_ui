import axios from 'axios';
import * as Constants from 'app/constants'
export const UPLOAD_FILE = '[SETTING_GIFT APP] UPLOAD FILE';

export function uploadFile(file) {


    return (dispatch, getState) => {

        // const { routeParams } = getState().giftsApp.gifts;
        const request = axios.post(Constants.BASE_URL + 'api/File/', file);

        return request.then((response) =>
            dispatch({
                type: UPLOAD_FILE,
                payload: response.data,
            })
        );
    };
}
