import type { ProjectConfig } from '/#/config';
import { CacheTypeEnum } from '/@/enums/cacheEnum';

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
    // 权限相关的缓存存储在sessionStorage或localStorage中。
    permissionCacheType: CacheTypeEnum.LOCAL,
};

export default setting;
