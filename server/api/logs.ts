import fs from "fs/promises";

export default defineEventHandler(async (event) => {
    const oldLogs = await fs.readFile(".logs/log.json", "utf-8");
    return  JSON.parse(oldLogs) as Record<any, any>[];
});