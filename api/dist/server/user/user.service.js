"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// import _ from "lodash";
class UserService {
    constructor() {
        /**
         * Register a user with firebase
         * @param email
         * @param password
         * @param phoneNumber
         * @param firstName
         * @param lastName
         */
        this._getUser = (email) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                user_model_1.default.find({ email: email }).then((user) => {
                    console.log('user:' + user);
                    console.log(typeof (user));
                    if (user.length > 0) {
                        resolve({ 'user': user, 'status': 200, 'msg': "user created!" });
                    }
                }).catch((err) => {
                    reject({ status: 404, msg: err });
                });
            });
        });
    }
}
exports.UserService = UserService;
