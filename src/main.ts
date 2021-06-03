import { createApp } from 'vue';
import App from './App';
import router, { setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { setupI18n } from '/@/locales/setupI18n';

if (import.meta.env.DEV) {
    import('ant-design-vue/dist/antd.less');
}

(async () => {
    const app = createApp(App);

    // Configure store
    setupStore(app);

    // Configure routing
    setupRouter(app);

    // Multilingual configuration
    await setupI18n(app);

    // Mount when the route is ready
    // https://next.router.vuejs.org/api/#isready
    await router.isReady();

    app.mount('#app', true);
})();
