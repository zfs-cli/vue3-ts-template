import { CacheTypeEnum } from '/@/enums/cacheEnum';

export interface ProjectConfig {
    // Storage location of permission related information
    permissionCacheType: CacheTypeEnum;
}

export interface GlobConfig {
    // Site title
    title: string;
    // Service interface url
    apiUrl: string;
    //  Service interface url prefix
    urlPrefix?: string;
}
export interface GlobEnvConfig {
    // Site title
    VITE_GLOB_APP_TITLE: string;
    // Service interface url
    VITE_GLOB_API_URL: string;
    // Service interface url prefix
    VITE_GLOB_API_URL_PREFIX?: string;
}
