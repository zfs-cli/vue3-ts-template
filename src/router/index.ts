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

export default router;
