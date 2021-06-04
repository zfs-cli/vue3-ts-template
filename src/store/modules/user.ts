import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/@/utils/fetch/types';

import { defineStore } from 'pinia';
import store from '/@/store';

import { PageEnum } from '/@/enums/pageEnum';
import { TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';

import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';

import { getUserInfo, loginApi } from '/@/api/sys/user';

import { useMessage } from '/@/hooks/web/useMessage';
import router from '/@/router';

interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
    sessionTimeout?: boolean;
}

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => ({
        // user info
        userInfo: null,
        // token
        token: undefined,
        // Whether the login expired
        sessionTimeout: false,
    }),
    getters: {
        getUserInfo(): UserInfo {
            return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
        },
        getToken(): string {
            return this.token || getAuthCache<string>(TOKEN_KEY);
        },
        getSessionTimeout(): boolean {
            return !!this.sessionTimeout;
        },
    },
    actions: {
        setToken(info: string | undefined) {
            this.token = info;
            setAuthCache(TOKEN_KEY, info);
        },
        setUserInfo(info: UserInfo) {
            this.userInfo = info;
            setAuthCache(USER_INFO_KEY, info);
        },
        setSessionTimeout(flag: boolean) {
            this.sessionTimeout = flag;
        },
        resetState() {
            this.userInfo = null;
            this.token = '';
            this.sessionTimeout = false;
        },
        /**
         * @description: login
         */
        async login(
            params: LoginParams & {
                goHome?: boolean;
                mode?: ErrorMessageMode;
            }
        ): Promise<GetUserInfoModel | null> {
            try {
                const { goHome = true, mode, ...loginParams } = params;
                const data = await loginApi(loginParams, mode);
                const { token } = data;

                // save token
                this.setToken(token);
                // get user info
                const userInfo = await this.getUserInfoAction();

                const sessionTimeout = this.sessionTimeout;
                sessionTimeout && this.setSessionTimeout(false);
                !sessionTimeout && goHome && (await router.replace(PageEnum.BASE_HOME));
                return userInfo;
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async getUserInfoAction() {
            const userInfo = await getUserInfo();
            this.setUserInfo(userInfo);
            return userInfo;
        },
        /**
         * @description: logout
         */
        logout(goLogin = false) {
            goLogin && router.push(PageEnum.BASE_LOGIN);
        },

        /**
         * @description: Confirm before logging out
         */
        confirmLoginOut() {
            const { createConfirm } = useMessage();
            createConfirm({
                iconType: 'warning',
                title: '温馨提醒',
                content: '是否确认退出系统',
                onOk: async () => {
                    await this.logout(true);
                },
            });
        },
    },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
    return useUserStore(store);
}
