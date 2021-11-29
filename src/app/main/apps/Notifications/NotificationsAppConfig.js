import React from 'react';
import { Redirect } from 'react-router-dom';

export const NotificationsAppConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/Notifications',
            component: React.lazy(() => import('./Notifications/NotificationsApp'))
        }
    ]
};
