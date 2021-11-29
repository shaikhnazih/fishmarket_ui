import React from 'react';
import {Redirect} from 'react-router-dom';

export const SchemeAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/planning/scheme/:id',
            component: React.lazy(() => import('./SchemeForm/SchemeForm'))
        },
        {
            path: '/apps/planning/scheme',
            component: React.lazy(() => import('./SchemeApp'))

 //           component: () => <Redirect to="/apps/scheme/all"/>
        }
    ]
};
