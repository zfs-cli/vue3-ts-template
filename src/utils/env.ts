import type { GlobEnvConfig } from '/#/config';
import { GLOB_CONFIG_NAME } from '../../build/constant';

export function getAppEnvConfig() {
    const ENV = (import.meta.env.DEV
        ? // Get the global configuration (the configuration will be extracted independently when packaging)
          (import.meta.env as unknown as GlobEnvConfig)
        : window[GLOB_CONFIG_NAME as any]) as unknown as GlobEnvConfig;

    const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX } = ENV;

    return {
        VITE_GLOB_APP_TITLE,
        VITE_GLOB_API_URL,
        VITE_GLOB_API_URL_PREFIX,
    };
}

/**
 * @description: Development model
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(): string {
    return import.meta.env.MODE;
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
    return import.meta.env.DEV;
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
    return import.meta.env.PROD;
}
