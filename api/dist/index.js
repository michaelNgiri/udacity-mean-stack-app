"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importStar(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
// import mongoose from "mongoose";
const { Sequelize } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./utils/logger"));
const auth_router_1 = __importDefault(require("./server/auth/auth.router"));
const link_router_1 = __importDefault(require("./server/link/link.router"));
const env = dotenv_1.default.config();
const logger = morgan_1.default;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(logger_1.default);
app.use(logger("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express_1.default.json());
const prefix = "/api/v1";
app.use(prefix, auth_router_1.default);
app.use(prefix, link_router_1.default);
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Links Manager");
});
app.get("/api/v1/docs", (req, res) => {
    const fileDirectory = path_1.default.resolve(__dirname, ".", "public/");
    res.sendFile("docs/api.yml", { root: fileDirectory }, (err) => {
        res.end();
        if (err)
            throw err;
    });
});
const { PORT } = process.env;
const { POSTGRES_URL } = process.env;
const sequelize = new Sequelize(POSTGRES_URL);
app.listen(PORT, () => {
    console.info(`Node server listening on port: ${PORT}`);
    console.log("connecting to database, please wait...");
    // Postgres connection
    sequelize.authenticate().then(() => { console.log('db uplink established...'); }).catch((err) => {
        console.log('db uplink failed...' + err);
    });
});
