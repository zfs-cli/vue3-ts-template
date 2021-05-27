import '/@/styles/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from '/@/router';
import { setupStore } from '/@/store';

(async () => {
    const app = createApp(App);

    // Configure store
    setupStore(app);

    // Configure routing
    setupRouter(app);

    // Mount when the route is ready
    // https://next.router.vuejs.org/api/#isready
    await router.isReady();

    app.mount('#app', true);
})();
