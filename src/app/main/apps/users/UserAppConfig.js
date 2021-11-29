import React from 'react';
import { Redirect } from 'react-router-dom';

export const UserAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/user',
            component: React.lazy(() => import('./UserApp'))
        }
        // ,
        // {
        //     path: '/apps/users',
        //     componeSnt: () => <Redirect to="/apps/users/all" />
        // }
    ]
};
