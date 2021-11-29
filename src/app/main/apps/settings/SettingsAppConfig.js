import React from 'react';
import { Redirect } from 'react-router-dom';

export const SettingsAppConfig = {
    settings: {
        layout: {}
    },
    routes: [
        /*        {
                    path     : '/apps/settings/gifts/:giftId/:giftHandle?',
                    component: React.lazy(() => import('./gift/Product'))
                },
        */
        {
            path: '/apps/settings/gifts',
            component: React.lazy(() => import('./gift/GiftApp'))
        },
        {
            path: '/apps/settings/giftCategory',
            component: React.lazy(() => import('./giftCategory/GiftCategoryApp'))
        },
        {
            path: '/apps/settings/feedbackCategory',
            component: React.lazy(() => import('./feedbackCategory/FeedbackCategoryApp'))
        },
        {
            path: '/apps/settings/banners',
            component: React.lazy(() => import('./banner/BannerApp'))
        },
        {
            path: '/apps/settings/retailerTarget',
            component: React.lazy(() => import('./retailerTarget/RetailerTargetApp'))
        },
        {
            path: '/apps/settings/pointExpiry',
            component: React.lazy(() => import('./pointexpiry/PointExpiryApp'))
        },
        /*
                {
                    path     : '/apps/e-commerce/orders/:orderId',
                    component: React.lazy(() => import('./order/Order'))
                },
                {
                    path: '/apps/settings/giftCategory',
                    component: React.lazy(() => import('./giftCategory/GiftCategoryApp'))
                },
                {
                    path: '/apps/settings/feedbackCategory',
                    component: React.lazy(() => import('./feedbackCategory/FeedbackCategoryApp'))
                },
                /*
                        {
                            path     : '/apps/e-commerce/orders/:orderId',
                            component: React.lazy(() => import('./order/Order'))
                        },
                        {
                            path     : '/apps/e-commerce/orders',
                            component: React.lazy(() => import('./orders/Orders'))
                        },
                */
        {
            path: '/apps/settings',
            component: () => <Redirect to="/apps/settings/gifts" />
        }
    ]
};
