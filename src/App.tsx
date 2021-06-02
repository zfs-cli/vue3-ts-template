import { defineComponent, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { getUserInfo } from './api/sys/user';

import { Button } from 'ant-design-vue';

export default defineComponent({
    name: 'App',
    setup() {
        onMounted(async () => {
            console.log(await getUserInfo());
        });
        return () => {
            return (
                <div>
                    <Button type="primary">你好</Button>
                    <RouterView />;
                </div>
            );
        };
    },
});
