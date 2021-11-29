

import React from 'react';

import { Redirect } from 'react-router-dom';

export const ReportAppConfig = {
    reports: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/reports/',
            component: React.lazy(() => import('./ReportApp/ReportApp'))
        },
        {
            path: '/apps/report',
            component: () => <Redirect to="/apps/reports/" />
        }
    ]
};


