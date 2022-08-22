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
exports.AuthService = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const lodash_1 = __importDefault(require("lodash"));
const password_reset_model_1 = __importDefault(require("./password.reset.model"));
const login_model_1 = __importDefault(require("./login.model"));
// @ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.DOMAIN_NAME;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });
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
        this._createUser = (email, phoneNumber, password, firstName, lastName) => __awaiter(this, void 0, void 0, function* () {
            console.log("inside the service");
            const salt = bcrypt_1.default.genSaltSync(10);
            const hashedPassword = bcrypt_1.default.hashSync(password, salt);
            return new Promise((resolve, reject) => {
                user_model_1.default.find({ email: email }).then((user) => {
                    // console.log('user:'+user)
                    if (user.length > 0) {
                        reject({ status: 403, msg: "user with this email exist!" });
                    }
                    const sso = Math.floor(100000 + Math.random() * 900000) + "-" + Math.floor(100000 + Math.random() * 900000) + "-" + Math.floor(100000 + Math.random() * 900000);
                    user_model_1.default.create({
                        email,
                        phoneNumber,
                        password: hashedPassword,
                        firstName,
                        lastName,
                        sso: sso,
                    }, function (err, user) {
                        if (err)
                            reject(err);
                    });
                    const subject = "welcome to WheelMax";
                    const body = `Hello <b style="text-transform: capitalize">${firstName}</b>, Your single sign on is (SSO): <br/> <b style="color: darkslategray; text-align: center; margin-top: 3em; font-weight: bolder; font-size: 24px;">${sso}</b><br/><span>Enter this to activate your account</span> <br/><span>Please save it for later use.</span> <hr style="margin-top: 5em;"/>Regards, The <b>wheelmax</b> Team`;
                    this.sendMail(email, subject, body).then(() => {
                        //
                    });
                    resolve({ user: user, status: 201, msg: "user created!" });
                }).catch((err) => {
                    reject({ status: 403, msg: err });
                });
            });
        });
        /**
         * find user
         * @param email
         * @param password
         * @param ipAddress
         */
        this._loginUser = (email, password, ipAddress) => __awaiter(this, void 0, void 0, function* () {
            console.log("email:" + email);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield user_model_1.default.find({ email: email }).then((user) => __awaiter(this, void 0, void 0, function* () {
                    console.log("user found:" + user);
                    if (user.length > 0) {
                        console.log("user search result > 0");
                        const dbPassword = String(lodash_1.default.map(user, lodash_1.default.property("password")));
                        const match = yield bcrypt_1.default.compare(password, dbPassword);
                        if (match) {
                            console.log("password matched:");
                            login_model_1.default.create({ isSuccessful: true, ipAddress: ipAddress, isActive: true, user: String(lodash_1.default.map(user, lodash_1.default.property("_id"))) }, function (err, user) {
                                console.log("user logged in:");
                                resolve({ "msg": "Login successful", "status": 200, "user": user, "success": true });
                                // if (err){reject({'status':403, 'msg': err}); console.log('login failed:'+err)} ;
                                console.log("db err:" + console.error);
                            });
                            console.log("login succesful-heading to controller:");
                            resolve({ "msg": "Login successful", "status": 200, "user": user, "success": true });
                        }
                        else {
                            reject({ "msg": "wrong email/password", "status": 401, "success": false });
                        }
                    }
                    else {
                        console.log('user not found');
                    }
                    // resolve({'msg':'User dos not exist', 'status':401,  'success':false})
                }));
                // .catch((err)=>{
                //     console.log('no user for the login:'+err)
                //     reject({'msg':err, 'status':401,  'success':false})
                // });
            }));
        });
        // /**
        //  * find user
        //  * @param email
        //  */
        // findUser  = async (email):Promise<object>=> {
        //     return new Promise(async (resolve, reject) => {
        //         User.find({email: email}).then((user) => {
        //             if (user.length > 0) {
        //                 reject({status: 403, msg: "user with this email exist!"});
        //             }
        //         });
        //     });
        // };
        /**
         * find user
         * @param email
         */
        this._sendOTP = (email) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                user_model_1.default.find({ email: email }).then((user) => {
                    if (user.length > 0) {
                        //message parameters
                        const otp = Math.floor(100000 + Math.random() * 900000);
                        const firstName = lodash_1.default.map(user, lodash_1.default.property("firstName"));
                        const subject = "password Reset";
                        const body = `Hello <b style="text-transform: capitalize">${firstName}</b>, Your one time password is: <br/> <b style="color: darkslategray; text-align: center; margin-top: 3em; font-weight: bolder; font-size: 24px;">${otp}</b> <hr style="margin-top: 5em;;"/>Regards, The <b>wheelmax</b> Team`;
                        //send the message.
                        this.sendMail(email, subject, body).then(() => {
                            password_reset_model_1.default.create({
                                user: String(lodash_1.default.map(user, lodash_1.default.property("_id"))),
                                userEmail: email,
                                oldPassword: String(lodash_1.default.map(user, lodash_1.default.property("password"))),
                                otp,
                            }, function (err, user) {
                                if (err)
                                    reject({ "statusCode": 403, "msg": err });
                                // resolve({statusCode:201, msg:"OTP sent to your email!"});
                            });
                            resolve({ "statusCode": 201, "msg": "OTP sent!" });
                        }).catch(() => {
                            reject({ "statusCode": 500, "msg": "an error occurred, couldn't send a mail" });
                        });
                        resolve({ "statusCode": 201, "msg": "OTP sent to your email!" });
                    }
                    else {
                        reject({ "statusCode": 403, "msg": "user with this email not found!" });
                    }
                }).catch(() => {
                    reject({ "statusCode": 500, "msg": "an error occurred, couldn't send a mail" });
                });
            }));
        });
        /**
         * find user
         * @param email
         * @param otp
         * @param newPassword
         */
        this.completePasswordReset = (email, otp, newPassword) => __awaiter(this, void 0, void 0, function* () {
            console.log("date:" + email, otp, newPassword);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                password_reset_model_1.default.find({ userEmail: email, otp }).then((pr) => {
                    console.log("the pr:" + pr);
                    if (pr.length > 0) {
                        console.log("password reset request found, proceeding...");
                        const now = Number(new Date(new Date()).getTime());
                        // @ts-ignore
                        const otpSendTime = Number(new Date(lodash_1.default.map(pr, lodash_1.default.property("createdAt"))).getTime());
                        const hours = Math.abs(otpSendTime - now) / 36e5;
                        console.log("hours:" + hours);
                        if (hours > 3) {
                            reject({ statusCode: 403, msg: "Your otp has expired!" });
                        }
                        else {
                            user_model_1.default.findOne({ email }).then((user) => __awaiter(this, void 0, void 0, function* () {
                                console.log("user found, initiating password reset...");
                                console.log("matches:" + newPassword + "kk" + String(lodash_1.default.map(pr, lodash_1.default.property("oldPassword"))));
                                const match = bcrypt_1.default.compareSync(newPassword, String(lodash_1.default.map(pr, lodash_1.default.property("oldPassword"))));
                                console.log(("result:" + match));
                                if (match) {
                                    console.log("new password is same with old one, aborting...");
                                    reject({ statusCode: 403, msg: "new password is same with old one, consider using it to login again with your email!" });
                                }
                                else {
                                    console.log("valid password entered! proceeding...");
                                    const salt = bcrypt_1.default.genSaltSync(10);
                                    const newPasswordHash = bcrypt_1.default.hashSync(newPassword, salt);
                                    user_model_1.default.findOneAndUpdate({ email: email }, { password: newPasswordHash }).then((f) => {
                                        password_reset_model_1.default.update({ successful: true }).then((f) => {
                                        }).catch((e) => {
                                            reject({ statusCode: 201, msg: "failed to set new Password!" });
                                        });
                                    });
                                    const subject = "PASSWORD RESET NOTICE";
                                    const body = `Hello <b style="text-transform: capitalize">${String(lodash_1.default.map(user, lodash_1.default.property("firstName")))}</b>, Your password has been succesfuly reset</span> <br/><span>If you did not initiate this process please notify support@wheelmax.com.</span> <hr style="margin-top: 5em;"/>Regards, The <b>wheelmax</b> Team`;
                                    this.sendMail(email, subject, body).then(() => {
                                        //
                                    });
                                    resolve({ statusCode: 201, msg: "Password reset successful!" });
                                }
                            }));
                        }
                    }
                    else {
                        console.log("password reset request not found, aborted!");
                        reject({ statusCode: 403, msg: "Wrong OTP!" });
                    }
                });
            }));
        });
        /**
         * verify user email
         * @param email
         * @param sso
         */
        this._verifyEmail = (email, sso) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                user_model_1.default.findOne({ email, sso }).then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (user) {
                        user.update({ isVerified: true });
                        resolve({ statusCode: 201, msg: "Email Verified!" });
                    }
                    else {
                        resolve({ statusCode: 403, msg: "email and sso doesn't match!" });
                    }
                })).catch(() => {
                    reject({ statusCode: 500, msg: "Error occurred!" });
                });
            }));
        };
        /**
         * verify user email
         * @param email
         */
        this.resendSSOToEmail = (email) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                user_model_1.default.findOne({ email }).then((user) => __awaiter(this, void 0, void 0, function* () {
                    const subject = "SSO for WheelMax";
                    const body = `Hello <b style="text-transform: capitalize">${String(lodash_1.default.map(user, lodash_1.default.property("firstName")))}</b>, Your single sign on is (SSO): <br/> <b style="color: darkslategray; text-align: center; margin-top: 3em; font-weight: bolder; font-size: 24px;">${String(lodash_1.default.map(user, lodash_1.default.property("sso")))}</b><br/><span>Enter this to activate your account</span> <br/><span>Please save it for later use.</span> <hr style="margin-top: 5em;"/>Regards, The <b>Wheelmax</b> Team`;
                    this.sendMail(email, subject, body).then(() => {
                        //
                    });
                    reject({ statusCode: 200, msg: "Your single sign-on code has been sent to your registered email!" });
                })).catch(() => {
                    reject({ statusCode: 500, msg: "Error occurred!" });
                });
            }));
        };
        this.sendMail = (email, subject, body) => {
            console.log('the email:' + email);
            console.log('the subject:' + subject);
            console.log('the body:' + body);
            console.log('domain:' + DOMAIN);
            console.log('API KEY:' + API_KEY);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const data = {
                    from: "WheelMax Support <no-reply@wheelmax.com>",
                    to: email,
                    subject: subject,
                    html: body,
                };
                mailgun.messages().send(data, (error, body) => {
                    if (error)
                        console.log(error);
                    reject(false);
                    resolve(true);
                });
                resolve(true);
            }));
        };
    }
}
exports.AuthService = AuthService;
