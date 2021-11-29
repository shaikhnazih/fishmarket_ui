import React from 'react';
import { Redirect } from 'react-router-dom';

export const FeedbackAppConfig = {
    settings: {
        layout: {}
    },
    routes: [
        {
            path: '/apps/feedback',
            component: React.lazy(() => import('./Feedback/FeedbackApp'))
        }
    ]
};
