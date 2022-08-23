"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const requestLogger = (req, res, next) => {
    const requestId = (0, uuid_1.v4)();
    console.info(`Request:${requestId}-start=> Method: ${req.method}; URL: ${req.originalUrl}`);
    const startTime = new Date().getTime();
    res.on("finish", () => {
        const timeSpan = new Date().getTime() - startTime;
        const content = `Request:${requestId}-end=>  Method: ${req.method}; URL: ${req.originalUrl}; Response: ${res.statusCode}; Timespan: ${timeSpan}\n`;
        fs_1.default.writeFileSync("logger.txt", content, {
            encoding: "utf8",
            flag: "a+",
            mode: 0o666
        });
        // console.info(
        // 	`Request:${requestId}-end=>  Method: ${req.method}; URL: ${req.originalUrl}; Response: ${res.statusCode}; Timespan: ${timeSpan}`
        // );
    });
    next();
};
exports.default = requestLogger;
