import type { AppRouteRecordRaw } from '/@/router/types';

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    meta: {
        title: 'ErrorPage',
    },
    children: [
        {
            path: '/:path(.*)*',
            name: 'ErrorPage',
            meta: {
                title: 'ErrorPage',
            },
        },
    ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
    path: '/redirect',
    name: 'redirect',
    meta: {
        title: 'redirect',
    },
    children: [
        {
            path: '/redirect/:path(.*)',
            name: 'redirect',
            meta: {
                title: 'redirect',
            },
        },
    ],
};
