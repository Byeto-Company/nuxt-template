import { cloneDeep, isEqual } from "lodash-es";

export function useTrackChanges<T extends Record<string, any>>(
    target: Ref<T> | ComputedRef<T>,
    excludeKeys: (keyof T)[] = []
) {
    const initial = ref<T>(cloneDeep(unref(target)));

    watch(
        () => unref(target),
        (nv, ov) => {
            if (nv !== ov) {
                initial.value = cloneDeep(nv);
            }
        },
        { immediate: true }
    );

    const changedFields = computed(() => {
        const changes: Partial<T> = {};

        const current = unref(target);

        for (const key in current) {
            if (excludeKeys.includes(key as keyof T)) continue;
            if (!isEqual(current[key], initial.value[key])) {
                changes[key] = current[key];
            }
        }

        return changes;
    });

    const reset = () => {
        initial.value = cloneDeep(unref(target));
    };

    return {
        changedFields,
        reset,
    };
}
