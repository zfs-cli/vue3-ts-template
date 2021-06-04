import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { useTitle } from '/@/hooks/web/useTitle';

export default defineComponent({
    name: 'App',
    setup() {
        useTitle();
        // support Multi-language
        return () => <RouterView />;
    },
});
