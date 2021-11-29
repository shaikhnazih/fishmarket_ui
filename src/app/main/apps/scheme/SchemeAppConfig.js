

import React from 'react';

import { Redirect } from 'react-router-dom';

export const SchemeAppConfig = {
    schemes: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/scheme/list/',
            component: React.lazy(() => import('./SchemeApp/SchemeTable'))
        },
        {
            path: '/apps/scheme/settings/:id?',
            component: React.lazy(() => import('./SchemeApp/SchemeSettings'))
        },
        {
            path: '/apps/scheme',
            component: () => <Redirect to="/apps/scheme/list/" />
        }

    ]
};


