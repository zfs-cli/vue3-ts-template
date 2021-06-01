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
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_OUTPUT_DIR } = viteEnv;

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
            outDir: VITE_OUTPUT_DIR,
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    // 是否显示console内容
                    drop_console: VITE_DROP_CONSOLE,
                },
            },
            // Turning off brotliSize display can slightly reduce packaging time
            brotliSize: false,
            chunkSizeWarningLimit: 2000,
        },
    };
};
