import React from 'react';
import { Redirect } from 'react-router-dom';

export const RedemptionAppConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/redemption/redemptionhistory',
            component: React.lazy(() => import('./RedemptionHistory/RedemptionHistory'))
        },
        {
            path: '/apps/redemption/redemption',
            component: React.lazy(() => import('./Redemption/Redemption'))
        },
        {
            path: '/apps/redemption',
            component: () => <Redirect to="/apps/redemption/redemption" />
        }
    ]
};
