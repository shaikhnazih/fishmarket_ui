import React from 'react';
import { Redirect } from 'react-router-dom';

export const RetailerTargetsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/retailerTarget/:id',
            component: React.lazy(() => import('./RetailerTargetsApp'))
        },
        {
            path: '/apps/retailerTarget',
            component: () => <Redirect to="/apps/retailerTarget/all" />
        }
    ]
};
