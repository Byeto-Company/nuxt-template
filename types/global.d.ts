import { API_RESOURCES } from "~/constants/resources";

export {};

declare global {
    type ApiPaginated<T> = {
        count: number;
        next: string | null;
        previous: string | null;
        results: T[];
    };

    type ApiResources = keyof typeof API_RESOURCES;

    type LogType = {
        title: string;
        status?: "success" | "error" | "info" | "warning";
        message?: string,
        details?: any
    }

    type AxiosLogType = {
        url: string,
        method: string,
        status: number,
        code: string,
        requestHeaders: Record<any, any>,
        responseHeaders: Record<any, any>,
        response?: Record<any, any>,
        payload?: Record<any, any>,
        params?: Record<any, any>,
        date: string
    }
}
