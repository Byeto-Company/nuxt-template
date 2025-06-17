export type ArticleSection = {
    id: number;
    type: "heading" | "paragraph" | "image" | "video";
    contentValue: any;
    options?: Record<any, any>;
};

export const useArticleBuilderStore = defineStore("articleBuilder", () => {
    // STATES

    const title = ref("");
    const contents = ref<ArticleSection[]>([
        {
            id: 1,
            contentValue: "Hello World",
            type: "heading",
            options: {
                level : 2
            },
        },
        {
            id: 2,
            contentValue: "Hello World 2313",
            type: "heading",
            options: {},
        },
    ]);

    // ACTIONS

    const setTitle = (value: string) => {
        title.value = value;
    };

    const setContents = (value: any) => {
        return (contents.value = value);
    };

    const getContent = (id: number) => {
        return contents.value.find((content) => content.id === id)!.contentValue;
    };

    const getOptions = (id: number) => {
        return contents.value.find((content) => content.id === id)!.options;
    };

    const updateContent = (id: number, value: any) => {
        const contentIndex = contents.value.findIndex((content) => content.id === id);
        const copyOfContents = [...contents.value];
        copyOfContents[contentIndex].contentValue = value;
        contents.value = copyOfContents;
    };

    const updateContentOptions = (id: number, value: any) => {
        const contentIndex = contents.value.findIndex((content) => content.id === id);
        const copyOfContents = [...contents.value];
        copyOfContents[contentIndex].options = value;
        contents.value = copyOfContents;
    };

    const appendContent = (value: Omit<ArticleSection, "id">) => {
        contents.value = [
            ...contents.value,
            {
                id: (contents.value[contents.value.length - 1]?.id ?? 0) + 1,
                ...value,
            },
        ];
    };

    const removeContent = (id: number) => {
        contents.value = contents.value.filter((content) => content.id !== id);
    };

    return {
        title,
        contents,
        setTitle,
        appendContent,
        removeContent,
        updateContent,
        updateContentOptions,
        getContent,
        setContents,
        getOptions,
    };
});
