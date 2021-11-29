import history from '@history';
import { setDefaultSettings, setInitialSettings } from 'app/store/actions/fuse';
import _ from '@lodash';
import store from 'app/store';
import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';

export const SET_USER_DATA = '[USER] SET DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';



/**
 * Set User Data
 */
export function setUserData(user) {
    return (dispatch) => {

        /*
        You can redirect the logged-in user to a specific route depending on his role
         */
        history.location.state = {
            redirectUrl: user.redirectUrl // for example 'apps/academy'
        }

        /*
        Set User Settings
         */
        dispatch(setDefaultSettings(user.data.settings));

        /*
        Set User Data
         */
        dispatch({
            type: SET_USER_DATA,
            payload: user
        })
    }
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {

    debugger;
    return (dispatch, getState) => {

        const oldUser = getState().auth.user;
        const user = _.merge({}, oldUser, { data: { settings } });

        updateUserData(user);

        return dispatch(setUserData(user));
    }
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
    return (dispatch, getState) => {
        const user = getState().auth.user;
        const newUser = {
            ...user,
            data: {
                ...user.data,
                shortcuts
            }
        };

        updateUserData(newUser);

        return dispatch(setUserData(newUser));
    }
}

/**
 * Remove User Data
 */
export function removeUserData() {
    return {
        type: REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser() {

    return (dispatch, getState) => {

        const user = getState().auth.user;

        if (!user.role || user.role.length === 0)// is guest
        {
            return null;
        }

        history.push({
            pathname: '/'
        });

        jwtService.logout();

        dispatch(setInitialSettings());

        dispatch({
            type: USER_LOGGED_OUT
        })
    }
}

/**
 * Update User Data
 */
function updateUserData(user) {
    if (!user.role || user.role.length === 0)// is guest
    {
        return;
    }

    switch (user.from) {
        case 'firebase':
            {
                break;
            }
        default:
            {
                jwtService.updateUserData(user)
                    .then(() => {
                        store.dispatch(Actions.showMessage({ message: "User data saved with api" }));
                    })
                    .catch(error => {
                        store.dispatch(Actions.showMessage({ message: error.message }));
                    });
                break;
            }
    }
}
