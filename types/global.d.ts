export {};

declare global {
    type ApiPaginated<T> = {
        count: number;
        next: string | null;
        previous: string | null;
        results: T[];
    };
}
