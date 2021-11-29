import React from 'react';
import {Redirect} from 'react-router-dom';
import {SchemeAppRoutes} from './scheme/SchemeAppRoutes'
export const PlanningAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
/*        {
            path     : '/apps/settings/gifts/:giftId/:giftHandle?',
            component: React.lazy(() => import('./gift/Product'))
        },
*/
        //{
        //    path: '/apps/planning/schemes',
        //    component: React.lazy(() => import('./scheme/PlanningAppConfig'))
        //},
		/*
        {
            path: '/apps/planning/scheme/:id',
            component: React.lazy(() => import('./scheme/SchemeForm/SchemeForm'))
        },*/
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
/*        {
            path: '/apps/planning/',
            component: () => { alert('plannin'); return <Redirect to="/apps/planning/schemes/create" /> }
        },
*/        ...SchemeAppRoutes
    ]
};
