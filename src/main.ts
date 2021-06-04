import { createApp } from 'vue';
import App from './App';
import router, { setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { setupRouterGuard } from '/@/router/guard';

if (import.meta.env.DEV) {
    import('ant-design-vue/dist/antd.less');
}

(async () => {
    const app = createApp(App);

    // Configure store
    setupStore(app);

    // Configure routing
    setupRouter(app);

    // router-guard
    setupRouterGuard();

    // Mount when the route is ready
    await router.isReady();

    app.mount('#app', true);
})();
