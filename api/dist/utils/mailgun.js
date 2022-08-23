"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailgun = void 0;
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.DOMAIN_NAME;
const MAILGUN_URL = process.env.MAILGUN_URL;
exports.mailgun = require("mailgun-js")({ username: "api", apiKey: API_KEY, domain: DOMAIN, url: MAILGUN_URL });
