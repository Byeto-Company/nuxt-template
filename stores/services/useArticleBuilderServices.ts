const useArticleBuilderServices = () => {
    const articleStore = useArticleBuilderStore();

    // computeds

    const articleContent = computed({
        get: () => articleStore.article.content,
        set: (value) => (articleStore.article.content = value),
    });

    // methods

    const appendContent = (value: Omit<ArticleSection, "id">) => {
        const newContent = {
            id: (articleContent.value[articleContent.value.length - 1]?.id ?? 0) + 1,
            ...value,
        };
        articleStore.article.content.push(newContent);
    };

    const getContent = (id: number) => {
        return articleContent.value.find((content) => content.id === id)!.contentValue;
    };

    const updateContent = (id: number, value: any) => {
        const contentIndex = articleContent.value.findIndex((content) => content.id === id);
        if (contentIndex !== -1) {
            articleContent.value[contentIndex].contentValue = value;
        }
    };

    const getOptions = (id: number) => {
        return articleContent.value.find((content) => content.id === id)!.options;
    };

    const updateContentOptions = (id: number, value: any) => {
        const contentIndex = articleContent.value.findIndex((content) => content.id === id);
        if (contentIndex !== -1) {
            articleContent.value[contentIndex].options = value;
        }
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
