export const useAppParams = () => {
    // state

    const otp = useRouteQuery<string | undefined>("otp", "");
    const parent_id = useRouteQuery<string | undefined>("parent_id", "");
    const slug = useRouteQuery<string | undefined>("slug", "");
    const parent_title = useRouteQuery<string | undefined>("parent_title", "");

    return {
        otp,
        parent_id,
        slug,
        parent_title,
    };
};
