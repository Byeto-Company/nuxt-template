const useAppToast = () => {
    const toast = useToast();

    const success = (title: string, icon?: string) => {
        toast.add({ color: "success", title, icon: icon ?? "fa-duo:circle-check" });
    };

    const error = (title: string, icon?: string) => {
        toast.add({ color: "error", title, icon: icon ?? "fa-duo:circle-exclamation" });
    };

    const warning = (title: string, icon?: string) => {
        toast.add({ color: "warning", title, icon: icon ?? "fa-duo:circle-exclamation" });
    };

    const info = (title: string, icon?: string) => {
        toast.add({ color: "info", title, icon: icon ?? "fa-duo:circle-exclamation" });
    };

    const text = (title: string, icon?: string) => {
        toast.add({ color: "neutral", title, icon: icon ?? "fa-duo:circle-exclamation" });
    };

    return {
        success,
        error,
        warning,
        info,
        text,
    };
};

export default useAppToast;
