import type { UserConfig, ConfigEnv } from 'vite';

const { resolve } = require('path');
import { loadEnv } from 'vite';

import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin/index';
import { generateModifyVars } from './build/generate/generateModifyVars';
import { OUTPUT_DIR } from './build/constant';

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
    console.log('环境', command);

    const root = process.cwd();
    const env = loadEnv(mode, root);
    const isBuild = command === 'build';
    const viteEnv = wrapperEnv(env);
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE } = viteEnv;

    return {
        base: VITE_PUBLIC_PATH,
        root,
        plugins: createVitePlugins(viteEnv, isBuild),
        resolve: {
            alias: [
                {
                    find: 'vue-i18n',
                    replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
                },
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
            // hmr: {
            //     overlay: false,
            // },
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: generateModifyVars(),
                    javascriptEnabled: true,
                },
            },
        },
        build: {
            target: 'es2015',
            outDir: OUTPUT_DIR,
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
