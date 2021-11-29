import React from 'react';
import { Redirect } from 'react-router-dom';

export const UpdateProfileAppConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/update-profile',
            component: React.lazy(() => import('./UpdateProfile/UpdateProfileApp'))
        }
    ]
};
