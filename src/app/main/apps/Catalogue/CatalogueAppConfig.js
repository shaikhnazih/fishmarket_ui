import React from 'react';
import { Redirect } from 'react-router-dom';

export const CatalogueAppConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/Catalogue',
            component: React.lazy(() => import('./Catalogue/CatalogueApp'))
        }
    ]
};
