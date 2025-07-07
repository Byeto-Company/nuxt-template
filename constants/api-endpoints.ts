export const API_ENDPOINTS = {
    user: {
        profile: "/user/profile",
        refresh: "/user/token/refresh",
        verify: "/user/verify",
        signin: "/user/token",
        logout: "/user/logout",
        otp: "/user/send_otp",
    },
    article: {
        upload: "/article/file",
        delete: "/article/file",
        patch_hero: "/article/child",
        create_section: "/article/content",
        get: "/article/child",
    },
};
