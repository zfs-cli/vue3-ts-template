declare interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_DROP_CONSOLE: boolean;
    VITE_OUTPUT_DIR: string;
}

declare type Recordable<T = any> = Record<string, T>;
