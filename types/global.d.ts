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
}
