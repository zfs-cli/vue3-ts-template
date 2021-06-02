export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
    // 将请求参数拼接至url
    joinParamsToUrl?: boolean;
    // 格式化请求参数时间
    formatDate?: boolean;
    // 是否处理该请求结果
    isTransformRequestResult?: boolean;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse?: boolean;
    // Whether to join url
    joinPrefix?: boolean;
    // 接口地址，如果留空则使用默认的apiUrl
    apiUrl?: string;
    // Error message prompt type
    errorMessageMode?: ErrorMessageMode;
    // Whether to add a timestamp
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
}

export interface Result<T = any> {
    code: number;
    type: 'success' | 'error' | 'warning';
    message: string;
    result: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
    // Other parameters
    data?: Recordable;
    // File parameter interface field name
    name?: string;
    // file name
    file: File | Blob;
    // file name
    filename?: string;
    [key: string]: any;
}
