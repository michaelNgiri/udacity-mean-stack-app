"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.Types.ObjectId;
//Schema.set('validateBeforeSave', true);
const PasswordResetSchema = new schema({
    user: { type: ObjectId, trim: true },
    userEmail: String,
    oldPassword: String,
    newPassword: String,
    otp: String,
    isSuccessful: { type: Boolean, default: false },
}, {
    timestamps: true
});
const PasswordReset = mongoose_1.default.model("PasswordReset", PasswordResetSchema);
exports.default = PasswordReset;
