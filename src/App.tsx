import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';
import { useLocale } from '/@/locales/useLocale';
import { useTitle } from '/@/hooks/web/useTitle';

export default defineComponent({
    name: 'App',
    setup() {
        useTitle();
        // support Multi-language
        const { getAntdLocale } = useLocale();
        return () => {
            return (
                <ConfigProvider locale={getAntdLocale}>
                    <RouterView />
                </ConfigProvider>
            );
        };
    },
});
