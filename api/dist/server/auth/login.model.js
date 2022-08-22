"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.Types.ObjectId;
//Schema.set('validateBeforeSave', true);
const UserLoginSchema = new schema({
    user: { type: ObjectId, trim: true },
    city: String,
    country: String,
    ipAddress: String,
    deviceType: String,
    deviceName: String,
    sessionID: String,
    isSuccessful: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
}, {
    timestamps: true
});
const UserLogin = mongoose_1.default.model("UserLogin", UserLoginSchema);
exports.default = UserLogin;
