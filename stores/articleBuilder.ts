export type ArticleSection = {
    id: number;
    type: "heading" | "paragraph" | "image" | "video" | "seprator" | "attachment" | "gallery";
    contentValue: any;
    options?: Record<any, any>;
};

export type Article = { title: string; description: string; content: ArticleSection[] };

export type Language = { label: string; code: string; icon: string };

export const useArticleBuilderStore = defineStore("articleBuilder", () => {
    const currentLanguage = useLocalStorage<Language>("current-language", {
        label: "فارسی",
        code: "fa",
        icon: "circle-flags:ir",
    });
    const main_title = useLocalStorage<string>("main-title", "");
    const article = useSessionStorage<Article>("article", { title: "", description: "", content: [] });

    // actions
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

    const setCurrentLanguage = (value: Language) => {
        currentLanguage.value = { ...value };
    };

    return {
        article,
        main_title,
        currentLanguage,
        setTitle,
        setDescription,
        setContent,
        setMainTitle,
        setCurrentLanguage,
    };
});
