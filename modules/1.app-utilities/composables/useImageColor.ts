import type { FastAverageColorResult } from "fast-average-color";
import { FastAverageColor } from "fast-average-color";

const useImageColor = (img: string) => {
    const fac = new FastAverageColor();
    const colorObject = ref<FastAverageColorResult>();
    const isPending = ref(false);

    const extractImageColor = async () => {
        isPending.value = true;

        const imageEl = document.querySelector(img) as HTMLImageElement;

        try {
            const color = await fac.getColorAsync(imageEl);
            isPending.value = false;
            colorObject.value = color;
        } catch (e) {
            isPending.value = false;
        }
    };

    onMounted(() => {
        extractImageColor();
    });

    return {
        colorObject,
        extractImageColor,
        isPending
    };
};

export default useImageColor;