import { useStorage } from "@vueuse/core";

export type ArticleSection = {
    id: number;
    order?: number;
    content_type: "heading" | "paragraph" | "image" | "video" | "separator" | "attachments" | "gallery";
    content_value: any;
    options?: Record<any, any>;
};

export type Article = {
    id: number | null;
    title: string;
    summary: string;
    parent: number | null;
    slug: string;
    thumbnail: File | string | null;
    is_publish: boolean;
    language: string;
    contents: ArticleSection[];
};

export type Language = { label: string; code: string; icon: string };

export const useArticleBuilderStore = defineStore("articleBuilder", () => {
    const currentLanguage = useStorage<Language>(
        "current-language",
        {
            label: "فارسی",
            code: "fa",
            icon: "circle-flags:ir",
        },
        sessionStorage
    );
    const main_title = useStorage<string>("main-title", "", sessionStorage);
    const article = useStorage<Article>(
        "article",
        {
            id: null,
            title: "",
            summary: "",
            parent: null,
            slug: "",
            thumbnail: null,
            is_publish: true,
            language: currentLanguage.value.code,
            contents: [],
        },
        sessionStorage
    );

    // actions

    const setContents = (value: any) => {
        article.value.contents = value;
    };

    const setCurrentLanguage = (value: Language) => {
        currentLanguage.value = { ...value };
        article.value.language = value.code;
    };

    return {
        article,
        main_title,
        currentLanguage,
        setContents,
        setCurrentLanguage,
    };
});
