const useArticleBuilderServices = () => {
    const articleStore = useArticleBuilderStore();

    // computeds

    const articleContent = computed({
        get: () => articleStore.article.content,
        set: (value) => (articleStore.article.content = value),
    });

    // methods

    const appendContent = (value: Omit<ArticleSection, "id">) => {
        const newConrent = {
            id: (articleContent.value[articleContent.value.length - 1]?.id ?? 0) + 1,
            ...value,
        };

        articleStore.article.content.push(newConrent);
    };

    const getContent = (id: number) => {
        return articleContent.value.find((content) => content.id === id)!.contentValue;
    };

    const updateContent = (id: number, value: any) => {
        const contentIndex = articleContent.value.findIndex((content) => content.id === id);
        const copyOfContents = [...articleContent.value];
        copyOfContents[contentIndex].contentValue = value;
        articleContent.value = copyOfContents;
    };

    const getOptions = (id: number) => {
        return articleContent.value.find((content) => content.id === id)!.options;
    };

    const updateContentOptions = (id: number, value: any) => {
        const contentIndex = articleContent.value.findIndex((content) => content.id === id);
        const copyOfContents = [...articleContent.value];
        copyOfContents[contentIndex].options = value;
        articleContent.value = copyOfContents;
    };

    const removeContent = (id: number) => {
        articleContent.value = articleContent.value.filter((content) => content.id !== id);
    };

    const clearData = () => {
        articleStore.article = { title: "", description: "", content: [] };
    };

    return {
        store: articleStore,
        appendContent,
        getContent,
        updateContent,
        getOptions,
        updateContentOptions,
        removeContent,
        clearData,
    };
};

export default useArticleBuilderServices;
