const useAppParams = () => {
    const page = useRouteQuery("page", "1", { transform: Number });
    const limit = useRouteQuery("limit", "10", { transform: Number });
    const offset = useRouteQuery("offset", undefined, {
        transform: (value) => (value ? Number(value) : undefined),
    });

    const cb = useRouteQuery<string>("cb");
    const prevPath = useRouteQuery<string>("prevPath");

    return {
        cb,
        page,
        offset,
        limit,
        prevPath,
    };
};

export default useAppParams;
