import React from 'react';
import { Redirect } from 'react-router-dom';

export const WorkflowTaskAppConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/workflowtask',
            component: React.lazy(() => import('./workflowtaskApp'))
        }
    ]
};
