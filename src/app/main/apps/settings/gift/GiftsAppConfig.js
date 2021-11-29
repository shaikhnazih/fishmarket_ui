import React from 'react';
import {Redirect} from 'react-router-dom';

export const GiftsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/gifts/:id',
            component: React.lazy(() => import('./GiftsApp'))
        },
        {
            path     : '/apps/gifts',
            component: () => <Redirect to="/apps/gifts/all"/>
        }
    ]
};
