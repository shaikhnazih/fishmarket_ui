import React from 'react';

export const FeedAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/feed',
            component: React.lazy(() => import('./FeedApp'))
        }
    ]
};
