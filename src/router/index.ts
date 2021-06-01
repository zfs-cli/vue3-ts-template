import type { RouteRecordRaw } from 'vue-router';
import routes from './routers';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

// app router
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

// config router
export function setupRouter(app: App<Element>) {
    app.use(router);
}

router.afterEach((to) => {
    window.document.title = (
        to.meta.title
            ? to.meta.title + ' - ' + import.meta.env.VITE_APP_TITLE
            : import.meta.env.VITE_APP_TITLE
    ) as string;
});

export default router;
