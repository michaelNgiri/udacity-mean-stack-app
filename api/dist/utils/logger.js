"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const requestLogger = (req, res, next) => {
    const requestId = (0, uuid_1.v4)();
    console.info(`Request:${requestId}-start=> Method: ${req.method}; URL: ${req.originalUrl}`);
    const startTime = new Date().getTime();
    res.on("finish", () => {
        const timeSpan = new Date().getTime() - startTime;
        console.info(`Request:${requestId}-end=>  Method: ${req.method}; URL: ${req.originalUrl}; Response: ${res.statusCode}; Timespan: ${timeSpan}`);
    });
    next();
};
exports.default = requestLogger;
