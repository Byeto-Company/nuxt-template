import { STATE_KEYS } from "~/constants";

export type GlobalStateKey<T> = {
    key: string;
    initial: T;
};

export type GlobalStateKeyInitial<K extends keyof typeof STATE_KEYS> = (typeof STATE_KEYS)[K] extends GlobalStateKey<infer T> ? T : never;

const useGlobalState = <K extends keyof typeof STATE_KEYS>(key: K) => {
    return useState<GlobalStateKeyInitial<K>>(STATE_KEYS[key].key, () => STATE_KEYS[key].initial as GlobalStateKeyInitial<K>);
};

export default useGlobalState;
