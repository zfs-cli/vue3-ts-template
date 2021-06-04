import { defineStore } from 'pinia';
import store from '/@/store';

interface PermissionState {
    // Permission code list
    permCodeList: string[];
}
export const usePermissionStore = defineStore({
    id: 'app-permission',
    state: (): PermissionState => ({
        permCodeList: [],
    }),
    getters: {
        getPermCodeList(): PermissionState['permCodeList'] {
            return this.permCodeList;
        },
    },
    actions: {
        setPermCodeList(codeList: string[]) {
            this.permCodeList = codeList;
        },
        resetState(): void {
            this.permCodeList = [];
        },
    },
});

// Need to be used outside the setup
export function usePermissionStoreWidthOut() {
    return usePermissionStore(store);
}
