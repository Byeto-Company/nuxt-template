import fs from "fs/promises";

type LogType = {
    title: string;
    status?: "success" | "error" | "info" | "warning";
    message?: string,
    details?: any
}

class Logger {
    private static formatToMarkdown(log: LogType) {
        const date = new Date();
        let month = "" + (date.getMonth() + 1);
        let day = "" + date.getDate();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        if (month.length < 2) {
            month = "0" + month;
        }

        if (day.length < 2) {
            day = "0" + day;
        }

        let markdownContent = "";

        let icon = "ℹ️";

        switch (log.status) {
            case "info":
                icon = "ℹ️";
                break;
            case "error":
                icon = "‼️";
                break;
            case "warning":
                icon = "⚠️";
                break;
            case "success":
                icon = "✅";
                break;
            default :
                icon = "ℹ️";
                break;
        }

        markdownContent += `# ${icon} ${log.title} \n`;
        markdownContent += `## ${[year, month, day].join("-")} ${hour}:${minutes}:${seconds} \n`;

        if (log.message) {
            markdownContent += `**Message:** ${log.message}\n`;
        }
        if (log.details) {
            markdownContent += `**Details:**\n\n\`\`\`json\n${JSON.stringify(log.details, null, 2)}\n\`\`\`\n\n`;
        }

        markdownContent += "<br></br>\n\n";
        markdownContent += "---\n";

        return markdownContent;
    }

    public static async log(info: LogType) {
        const formattedLog = this.formatToMarkdown(info);

        try {
            await fs.appendFile(".logs/log.md", formattedLog);
        } catch (e) {
            console.error(e);
        }
    }
}

export default Logger;