import { BUS_EVENTS } from "~/constants/bus-events";

const useDefineBus = ({ eventKey, id, cb }: { eventKey: keyof typeof BUS_EVENTS; id?: string; cb: Function }) => {
    const { $bus: bus } = useNuxtApp();

    onMounted(() => {
        bus.on(BUS_EVENTS[eventKey], (event) => {
            if (id) {
                if (event === id) cb();
            } else {
                cb();
            }
        });
    });

    onUnmounted(() => {
        bus.off(BUS_EVENTS[eventKey]);
    });
};

export default useDefineBus;
