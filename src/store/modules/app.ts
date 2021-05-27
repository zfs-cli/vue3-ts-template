import { defineStore } from 'pinia';

interface AppState {
    // Page loading status
    pageLoading: boolean;
}

export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        pageLoading: false,
    }),
    getters: {
        getPageLoading(): boolean {
            return this.pageLoading;
        },
    },
    actions: {
        setPageLoading(loading: boolean): void {
            this.pageLoading = loading;
        },
    },
});
