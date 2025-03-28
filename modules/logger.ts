
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