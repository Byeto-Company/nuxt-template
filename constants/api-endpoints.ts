export const API_ENDPOINTS = {
    user: {
<<<<<<< HEAD
        profile: {
            key: "",
            path: "/user/profile",
        },
        refresh: {
            path: "/user/token/refresh",
            key: "",
        },
        verify: {
            path: "/user/verify",
            key: "",
        },
        signin: {
            path: "/user/token",
            key: "",
        },
        logout: {
            path: "/user/logout",
            key: "",
        },
        otp: {
            path: "/user/send_otp",
            key: "",
        },
        develop_token: {
            path: "/user/develop_token",
            key: "",
        },
=======
        profile: "/user/profile",
        refresh: "/user/token/refresh",
        verify: "/user/verify",
        signin: "/user/token/admin-pannel",
        logout: "/user/logout",
        otp: "/user/send_otp",
    },
    article: {
        create_parent: "/article/create-parent",
        patch_hero: "/article/child",
        upload_file: "/article/file",
        delete_file: "/article/file",
        create_section: "/article/content",
        delete_section: "/article/content",
        patch_section: "/article/content",
        reorder_section: "/article/content/reorder",
        get: "/article/child",
>>>>>>> 0eb50ea03f304e3ee416d358a2f1fbc554d9c366
    },
};
