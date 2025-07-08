const useArticleBuilderServices = () => {
    const articleStore = useArticleBuilderStore();

    // computeds

    const articleContent = computed({
        get: () => articleStore.article.contents,
        set: (value) => (articleStore.article.contents = value),
    });

    // methods

    const appendContent = (value: ArticleSection) => {
        articleStore.article.contents.push(value);
    };

    const getContent = (id: number) => {
        return articleContent.value.find((content) => content.id === id)!.content_value;
    };

    const updateContent = (id: number, value: any) => {
        const contentIndex = articleContent.value.findIndex((content) => content.id === id);
        if (contentIndex !== -1) {
            const updated = [...articleContent.value];
            updated[contentIndex] = { ...updated[contentIndex], content_value: value };
            articleContent.value = updated;
        }
    };

    const getOptions = (id: number) => {
        return articleContent.value.find((content) => content.id === id)!.options;
    };

    const updateContentOptions = (id: number, value: any) => {
        const contentIndex = articleContent.value.findIndex((content) => content.id === id);
        if (contentIndex !== -1) {
            const updated = [...articleContent.value];
            updated[contentIndex] = { ...updated[contentIndex], options: value };
            articleContent.value = updated;
        }
    };

    const removeContent = (id: number) => {
        articleContent.value = articleContent.value.filter((content) => content.id !== id);
    };

    const clearData = () => {
        Object.assign(articleStore.article, {
            title: "",
            summary: "",
            slug: "",
            thumbnail: null,
            contents: [],
        });
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
