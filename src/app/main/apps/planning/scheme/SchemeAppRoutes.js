import React from 'react';

export const SchemeAppRoutes=[
  
        {
            path     : '/apps/planning/scheme/:id',
        component: React.lazy(() => { alert(); return import('./SchemeApp/SchemeApp') })
        },


        {
            path: '/apps/planning/scheme/',
            component: React.lazy(() => { return import('./SchemeList/SchemeListApp') })
        }

    ]
