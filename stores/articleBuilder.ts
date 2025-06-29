export type ArticleSection = {
    id: number;
    type: "heading" | "paragraph" | "image" | "video" | "seprator";
    contentValue: any;
    options?: Record<any, any>;
};

export type Article = { title: string; description: string; content: ArticleSection[] };

export type Language = { title: string; value: string };

export const useArticleBuilderStore = defineStore("articleBuilder", () => {
    // States (plain refs, safe for SSR)
    const currentLanguage = ref<Language>({
        title: "فارسی",
        value: "fa",
    });
    const main_title = ref<string>("");
    const article = ref<Article>({ title: "", description: "", content: [] });

    let main_title_storage: Ref<string> | undefined;
    let article_storage: Ref<Article> | undefined;

    onMounted(() => {
        main_title_storage = useSessionStorage<string>("main-title", "");
        article_storage = useLocalStorage<Article>("article", { title: "", description: "", content: [] });

        main_title.value = main_title_storage.value;
        article.value = article_storage.value;

        watch(main_title, (val) => {
            if (main_title_storage) main_title_storage.value = val;
        });

        watch(
            article,
            (val) => {
                if (article_storage) article_storage.value = val;
            },
            { deep: true }
        );
    });

    // Actions
    const setMainTitle = (value: string) => {
        main_title.value = value;
    };

    const setTitle = (value: string) => {
        article.value.title = value;
    };

    const setDescription = (value: string) => {
        article.value.description = value;
    };

    const setContent = (value: any) => {
        article.value.content = value;
    };

    return {
        article,
        main_title,
        setTitle,
        setDescription,
        setContent,
        setMainTitle,
    };
});
