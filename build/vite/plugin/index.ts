import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { configStyleImportPlugin } from './styleImport';
import { configHtmlPlugin } from './html';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const vitePlugins: (Plugin | Plugin[])[] = [
        // have to
        vue(),
        // have to
        vueJsx(),
    ];

    // vite-plugin-style-import
    vitePlugins.push(configStyleImportPlugin(isBuild));
    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

    return vitePlugins;
}
