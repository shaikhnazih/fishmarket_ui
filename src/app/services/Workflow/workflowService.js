import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import * as Constants from 'app/constants'
class WorkflowService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
/*                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);*/
                }
                throw err;
            });
        });
    };

    getPendingTasks = () => {
        return new Promise((resolve, reject) => {
            axios.post(Constants.BASE_URL + 'api/WorkflowTask/getPendingTasks', null).then(response => {
                const responsePkg = response.data;
                if (responsePkg)
                {
                    resolve(responsePkg);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

}

const instance = new workflowService();

export default instance;
