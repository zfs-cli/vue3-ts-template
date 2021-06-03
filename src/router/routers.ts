export default [
    {
        path: '/',
        name: 'home',
        meta: {
            title: '首页1',
        },
        component: () => import('/@/pages/index/index'),
        children: [],
    },
];
