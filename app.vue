<script setup>

// TODO implement complete network logs system ( showing all network requests ) OPTIONAL
// TODO create auth module with otp or credential ( it should have multiple approach )

import { VueQueryDevtools } from "@tanstack/vue-query-devtools";


// const winstonLogger = winston.createLogger({
//     format: winston.format.json(),
//     transports: [
//         new winston.transports.File({
//             format: format.printf((info) => {
//                 const logData = {
//                     url: "info.url",
//                     code: "info.code",
//                     status: "info.status",
//                     method: "info.method",
//                     response: "info.response",
//                     requestHeaders: "info.requestHeaders",
//                     responseHeaders: "info.responseHeaders",
//                     payload: "info.payload",
//                     params: "info.params",
//                     date: "info.timestamp"
//                 };
//                 return JSON.stringify(logData);
//             }),
//             filename: ".logs/app-errors.log",
//             level: "error"
//         }),
//         new winston.transports.File({
//             filename: ".logs/app-logs.log"
//         })
//     ]
// });
//
// winstonLogger.info("Information message", {
//     path : path
// });

</script>

<template>
    <div>
        <NuxtRouteAnnouncer />

        <NuxtLayout>
            <UApp>
                <NuxtPage />
            </UApp>
            <div dir="ltr">
                <VueQueryDevtools dir="ltr" buttonPosition="bottom-left" />
            </div>
        </NuxtLayout>
    </div>
</template>