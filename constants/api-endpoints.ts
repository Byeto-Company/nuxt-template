export const API_ENDPOINTS = {
    user: {
        profile: "/user/profile",
        refresh: "/user/token/refresh",
        verify: "/user/verify",
        signin: "/user/token/admin-pannel",
        logout: "/user/logout",
        otp: "/user/send_otp",
    },
    article: {
        patch_hero: "/article/child",
        upload_file: "/article/file",
        delete_file: "/article/file",
        create_section: "/article/content",
        delete_section: "/article/content",
        patch_section: "/article/content",
        reorder_section: "/article/content/reorder",
        get: "/article/child",
    },
};
