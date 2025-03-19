import fs from "fs/promises";

class Logger {
    public static async axiosErrorLog(error: any) {
        const errorJson = error.toJSON();

        const nowDate = new Date();

        const logData: AxiosLogType = {
            url: errorJson.config.url,
            code: errorJson.code!,
            status: errorJson.status!,
            method: errorJson.config.method,
            response: error?.response?.data,
            requestHeaders: errorJson.config.headers,
            responseHeaders: error.response.headers,
            payload: errorJson.config.data ? JSON.parse(errorJson.config.data) : undefined,
            params: errorJson.config.params ?? undefined,
            date: nowDate.toString()
        };

        const logFilePath = ".logs/log.json";

        try {
            await ensureFileExists(logFilePath);

            const oldLogs = await fs.readFile(logFilePath, "utf-8");
            const oldLogsJson = JSON.parse(oldLogs) as Record<any, any>[];

            oldLogsJson.push(logData);

            await fs.writeFile(".logs/log.json", JSON.stringify(oldLogsJson, null, 2));
        } catch (e) {
            console.error(e);
        }
    }
}

export default Logger;