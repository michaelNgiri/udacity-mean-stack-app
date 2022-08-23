"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// import  from "../user/user.model";
const user_model_1 = require("../user/user.model");
const lodash_1 = __importDefault(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor() {
        /**
         * Register a user with firebase
         * @param email
         * @param password
         * @param phoneNumber
         * @param firstName
         * @param lastName
         */
        this._createUser = async (email, password, firstName, lastName) => {
            console.log("inside the service");
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = bcrypt_1.default.hashSync(password, salt);
            return new Promise((resolve, reject) => {
                console.log('making a promise');
                user_model_1.User.findOne({ where: { email: email } }).then((user) => {
                    console.log('user:' + user);
                    if (user == null) {
                        reject({ status: 403, msg: "user with this email exist!" });
                    }
                    user_model_1.User.create({
                        email,
                        password: hashedPassword,
                        firstName,
                        lastName,
                    }, (err, user) => {
                        if (err)
                            reject({ data: user, status: 501, msg: "this is bad!" });
                        resolve({ data: user, status: 201, msg: "user created!" });
                    });
                }).catch((err) => {
                    console.log('error:' + err);
                    reject({ status: 403, msg: err });
                });
            });
        };
        /**
         * find user
         * @param email
         * @param password
         * @param ipAddress
         */
        this._loginUser = async (email, password) => {
            return new Promise((resolve, reject) => {
                user_model_1.User.findOne({ where: { email: email } }).then(async (user) => {
                    console.log("user found:" + user);
                    if (user !== null) {
                        const dbPassword = String(lodash_1.default.map(user, lodash_1.default.property("password")));
                        console.log("user password:" + dbPassword);
                        const match = await bcrypt_1.default.compare(password, dbPassword);
                        resolve({ msg: "Login successful", status: 200, data: user, success: true });
                        if (match) {
                            console.log("password matched:");
                            console.log("user logged in:");
                            resolve({ msg: "Login successful", status: 200, data: user, success: true });
                        }
                        else {
                            reject({ msg: "wrong email/password", status: 401, success: false });
                        }
                    }
                    else {
                        console.log("user not found");
                    }
                    // resolve({'msg':'User dos not exist', 'status':401,  'success':false})
                });
                // .catch((err)=>{
                //     console.log('no user for the login:'+err)
                //     reject({'msg':err, 'status':401,  'success':false})
                // });
            });
        };
        /**
         * Find a user
         * @param email
         */
        this._getUser = async (email) => {
            console.log("getting a user");
            return new Promise((resolve, reject) => {
                console.log('making a promise');
                user_model_1.User.findOne({ where: { email: email } }).then((user) => {
                    resolve({ data: user, status: 200, msg: "user found!" });
                }).catch((err) => {
                    console.log('error:' + err);
                    reject({ status: 403, msg: err });
                });
            });
        };
    }
}
exports.AuthService = AuthService;
