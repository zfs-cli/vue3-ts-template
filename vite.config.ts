import type { UserConfig, ConfigEnv } from 'vite';

const { resolve } = require('path');
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { wrapperEnv } from './build/utils';

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
    console.log('环境', command);

    const root = process.cwd();
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;

    return {
        base: VITE_PUBLIC_PATH,
        root,
        plugins: [vue(), vueJsx()],
        resolve: {
            alias: [
                // src/xxxx => /@/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/',
                },
                // types/xxxx => /#/xxxx
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/',
                },
            ],
        },
        server: {
            port: VITE_PORT,
        },
        build: {
            target: 'es2015',
            outDir: '/',
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    // 生产环境console是否显示
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
            // Turning off brotliSize display can slightly reduce packaging time
            brotliSize: false,
            chunkSizeWarningLimit: 2000,
        },
    };
};
