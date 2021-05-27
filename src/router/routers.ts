export default [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '首页',
        },
        component: () => import('/@/pages/index/index.vue'),
        children: [],
    },
];
