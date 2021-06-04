import type { RouteRecordRaw } from 'vue-router';
import { basicRoutes } from './routes/index';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

// app router
const router = createRouter({
    history: createWebHashHistory(),
    routes: basicRoutes as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

// config router
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;
