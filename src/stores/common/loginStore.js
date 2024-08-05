import { reactive } from 'vue';
import { defineStore } from 'pinia';
import {getRefreshToken} from '@/utils/token.js';
import postRefreshToken from '@/api/common/token.js';

export const useUserLoginStore = defineStore('userLogin', () => {
    
    const userInfo = reactive({});
    
    function onPortalLogin(toPath = '/') {
        
        let redirectUrl = encodeURIComponent(window.location.href);
        if (toPath) {
            redirectUrl = `${window.location.origin}${import.meta.env.VITE_BASE_PATH}${toPath}`;
        }
        window.location.href = `${import.meta.env.VITE_USER_API}/auth/login?redirectUrl=${redirectUrl}`;
    }
    
    async function onRefreshToken(toPath = '/') {
        
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
            console.error('Not found refresh token.');
            onPortalLogin();
        }
        try { await postRefreshToken(refreshToken); }
        catch (err) {
            console.error(err);
            onPortalLogin(toPath)
        }
    }
    
    return { userInfo, onPortalLogin, onRefreshToken };
});
