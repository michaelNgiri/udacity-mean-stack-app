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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_router_1 = __importDefault(require("./server/auth/auth.router"));
const logger_1 = __importDefault(require("./utils/logger"));
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
app.get("/", (req, res) => {
    const fileDirectory = path_1.default.resolve(__dirname, ".", "public/");
    res.sendFile("index.html", { root: fileDirectory }, (err) => {
        res.end();
        if (err)
            throw err;
    });
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
app.listen(PORT, () => {
    console.info(`Node server listening on port: ${PORT}`);
    console.log("connecting to database, please wait...");
    const mongoURI = process.env.MONGO_DB_URI;
    mongoose_1.default
        .connect(String(mongoURI)
    // , {
    // // socketTimeoutMS: 0,
    // keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // autoIndex: true, //for having unique fields like email
    // poolSize: 10,
    // bufferMaxEntries: 0,
    // connectTimeoutMS: 10000,
    // socketTimeoutMS: 45000,
    // family: 4, // Use IPv4, skip trying IPv6
    // }
    )
        .then((info) => {
        if (info) {
            console.log("info:" + info);
        }
        console.info("database connection established");
    })
        .catch((err) => {
        console.log(`err: ${err}`);
        console.warn("database connection failed, please check your network!");
    });
});
