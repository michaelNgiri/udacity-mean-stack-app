"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
//Schema.set('validateBeforeSave', true);
const UserSchema = new schema({
    //mongoose.Schema.ObjectI
    userName: String,
    firstName: String,
    lastName: String,
    email: { type: String, trim: true, index: true, unique: true, sparse: true },
    password: String,
    phone: String,
    sso: String,
    emailVerified: { type: Boolean, default: false }
}, {
    timestamps: true
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
