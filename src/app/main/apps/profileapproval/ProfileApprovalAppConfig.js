import React from 'react';
import { Redirect } from 'react-router-dom';

export const ProfileApprovalAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/profileapproval',
            component: React.lazy(() => import('./ProfileApprovalApp'))
        }
    ]
};
