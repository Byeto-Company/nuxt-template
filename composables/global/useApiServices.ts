import useArticleBuilderServices from "~/stores/services/useArticleBuilderServices";
import usePatchHero, { type PatchHeroRequest } from "../api/article-builder/usePatchHero";
import { useAppParams } from "./useAppParams";

export const useApiServices = () => {
    // state

    const toast = useToast();

    const { store } = useArticleBuilderServices();

    const { slug } = useAppParams();

    // queries

    const { mutateAsync: patchHero, isPending: patchIsPending } = usePatchHero();

    // methods

    const handlePatchHero = (params: Partial<PatchHeroRequest>) => {
        patchHero(
            { ...params, slug: slug.value },
            {
                onSuccess: (data) => {
                    toast.add({
                        title: "تغییرات عنوان با موفقیت ثبت شد",
                        color: "success",
                    });
                    slug.value = data.slug;
                    store.article.thumbnail = data.thumbnail;
                },
                onError: () => {
                    toast.add({
                        title: "خطایی در تغییرات عنوان پیش آمد",
                        description: "لطفا مجدد تلاش کنید",
                        color: "error",
                    });
                },
            }
        );
    };

    return {
        handlePatchHero,
        patchIsPending
    };
};
