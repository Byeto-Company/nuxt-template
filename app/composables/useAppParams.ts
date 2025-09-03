const useAppParams = () => {
    const page = useRouteQuery("page", "1", { transform: Number });
    const limit = useRouteQuery("limit", "10", { transform: Number });
    const offset = useRouteQuery("offset", undefined, {
        transform: (value) => (value ? Number(value) : undefined),
    }); 
    // const filters = useRouteQuery("filters", "{}", {
    //     transform: (value) => JSON.parse(value) as Record<string, string | number | boolean>,
    // });
    // const sort = useRouteQuery<string | undefined>("sort", un. defined);

    const cb = useRouteQuery<string>("cb");
    const prevPath = useRouteQuery<string>("prevPath");

    return {
        // sort,
        // filters,
        cb,
        page,
        offset,
        limit,
        prevPath,
    };
};

export default useAppParams;
