import React from 'react';

export const ProductFeedAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/feed',
            component: React.lazy(() => import('./ProductFeedApp'))
        }
    ]
};
