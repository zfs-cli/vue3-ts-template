import fetch from '/@/utils/fetch';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/@/utils/fetch/types';

enum Api {
    Login = '/login',
    GetUserInfo = '/getUserInfo',
    GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
    return fetch.post<LoginResultModel>(
        {
            url: Api.Login,
            params,
        },
        {
            errorMessageMode: mode,
        }
    );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
    return fetch.get<GetUserInfoModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
    return fetch.get<string[]>({ url: Api.GetPermCode });
}
