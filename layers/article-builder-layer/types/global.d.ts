export {};

declare global {
    type FileResponse = {
        id: number;
        file: string;
        created_at: string;
        size: number;
        name: string;
    };
}
