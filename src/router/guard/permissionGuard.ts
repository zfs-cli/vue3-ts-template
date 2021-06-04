import type { Router } from 'vue-router';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWidthOut } from '/@/store/modules/user';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
    const userStore = useUserStoreWidthOut();
    router.beforeEach(async (to, from, next) => {
        // Jump to the 404 page after processing the login
        if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
            next(PageEnum.BASE_HOME);
            return;
        }

        // Whitelist can be directly entered
        if (whitePathList.includes(to.path as PageEnum)) {
            next();
            return;
        }

        const token = userStore.getToken;

        // 没有token
        if (!token) {
            // 你可以在没有权限的情况下访问。你需要将路由meta.ignoreAuth设置为true
            if (to.meta.ignoreAuth) {
                next();
                return;
            }
            // 重定向到登录页
            const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
                path: LOGIN_PATH,
                replace: true,
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path,
                };
            }
            next(redirectData);
            return;
        }
        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
        next(nextData);
    });
}
