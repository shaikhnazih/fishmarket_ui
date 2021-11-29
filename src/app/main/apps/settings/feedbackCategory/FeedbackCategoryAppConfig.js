import React from 'react';
import {Redirect} from 'react-router-dom';

export const FeedbackCategoryAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/feedbackCategory/:id',
            component: React.lazy(() => import('./FeedbackCategoryApp'))
        },
        {
            path     : '/apps/feedbackCategory',
            component: () => <Redirect to="/apps/feedbackCategory/all"/>
        }
    ]
};
