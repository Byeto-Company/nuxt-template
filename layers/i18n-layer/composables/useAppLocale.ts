import * as ui_locales from "@nuxt/ui/locale";

export const useAppLocale = () => {
    // state

    const { $queryClient: queryClient } = useNuxtApp();
    const { locales, setLocale, locale } = useI18n();

    const lang = computed(() => ui_locales[locale.value == "fa" ? "fa_ir" : locale.value].code);
    const dir = computed(() => ui_locales[locale.value == "fa" ? "fa_ir" : locale.value].dir);

    // computed

    const currentLocale = computed({
        get: () => findCurrentLocale(),
        set: (value) => {
            const targetLocale = findCurrentLocale(value?.code);
            setLocale(targetLocale?.code!).then(() => {
                queryClient.invalidateQueries();
            });
        },
    });

    const availableLocales = computed(() => {
        return locales.value.map((locale) => {
            return {
                code: locale.code,
                title: locale.verbose_name as string,
                icon: locale.icon as string,
            };
        });
    });

    // methods

    const findCurrentLocale = (code?: string) => {
        if (!!code) {
            return locales.value.find((i) => i.code == code);
        } else {
            return locales.value.find((i) => i.code == locale.value);
        }
    };

    return {
        availableLocales,
        currentLocale,
        lang,
        dir,
        setLocale,
    };
};
