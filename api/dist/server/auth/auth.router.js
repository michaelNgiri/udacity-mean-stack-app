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
const express = __importStar(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const AuthRouter = express.Router()
    .post("/auth/register", auth_controller_1.default.createUser)
    .post("/auth/login", auth_controller_1.default.login)
    .post("/auth/password-reset/send-otp", auth_controller_1.default.initiatePasswordReset)
    .post("/auth/password-reset/complete", auth_controller_1.default.resetPassword)
    .put("/auth/verify-email", auth_controller_1.default.verifyEmail)
    .post("/auth/resend-sso", auth_controller_1.default.resendSSO)
    .post("/auth/verify-token", auth_controller_1.default.verifyToken);
exports.default = AuthRouter;
