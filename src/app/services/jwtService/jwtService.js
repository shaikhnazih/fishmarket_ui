import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import * as Constants from 'app/constants'
class jwtService extends FuseUtils.EventEmitter {

    init() {
        if (window.location.hash && window.location.hash.indexOf('KonnectAuthToken=') >= 0) {
            console.log('ssotoken', window.location.hash.split('KonnectAuthToken=')[1])
            this.setSession(window.location.hash.split('KonnectAuthToken=')[1]);
        }
        this.setInterceptors();
        this.handleAuthentication();

    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                console.log('check this')
                console.log(err)

                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', err.response.data.message);
                    this.setSession(null);
                }


                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();
        //alert(access_token)
        if (!access_token) {
            this.emit('onNoAccessToken');
            return;
        }

        if (this.isAuthTokenValid(access_token)) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithEmailAndPassword = (email, password, captcha) => {
        return new Promise((resolve, reject) => {
            axios.post(Constants.BASE_URL + 'api/auth/userLogin', {
                email: email,
                password,
                captcha
            }).then(response => {
                const logonPkg = response.data;
                const logonUser = logonPkg.logonUser
                if (logonUser) {
                    logonUser.redirectUrl = "apps/dashboard"
                    this.setSession(logonPkg.token);
                    resolve(logonPkg.logonUser);
                }
                else {
                    reject(response.data.error);
                }
            }).catch(error => {
                console.log(error)
                reject(error);
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.post(Constants.BASE_URL + 'api/auth/access-token', {
                data: {
                    access_token: this.getAccessToken()
                }
            })
                .then(response => {
                    const logonPkg = response.data;
                    const logonUser = logonPkg.logonUser
                    if (logonUser) {
                        //                        this.setSession(logonUser.token);
                        resolve(logonPkg.logonUser);
                    }
                    else {
                        this.logout();
                        reject('Failed to login with token.');
                    }
                })
                .catch(error => {
                    this.logout();
                    reject('Failed to login with token.');
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = access_token => {

        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }
        else {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
