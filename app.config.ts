export default defineAppConfig({
    icon: {
        customize: (content: string, name: string, prefix: string, provider: string) => {
            // if (content.includes("@fontawesome")) {
            //     return `<g fill="currentColor">
            //         ${content}
            //     </g>`;
            // }

            return content;
        },
    },
    ui: {
        colors: {
            custom: "custom",
            primary: "blue",
            neutral: "zinc",
        },
    },
});
