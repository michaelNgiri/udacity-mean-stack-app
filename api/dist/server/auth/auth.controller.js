"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
require("dotenv").config();
const auth_service_1 = require("./auth.service");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const sk = process.env.JWT_KEY;
class AuthController extends auth_service_1.AuthService {
    constructor() {
        super(...arguments);
        /**
         * Signup a user
         * @param req
         * @param res
         * @param next
         */
        this.createUser = (req, res, next) => {
            console.log("secret key:" + sk);
            const { firstName, lastName, email, phoneNumber, password } = req.body;
            console.log(req.body);
            this._createUser(email, phoneNumber, password, firstName, lastName).then((resp) => {
                // @ts-ignore
                res.status(parseInt(resp["status"])).json({
                    success: true,
                    token: jwt.sign({ email: email, lastName, firstName }, sk),
                    msg: "User created successfully!"
                });
            }).catch((resp) => {
                res.status(parseInt(resp.status)).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * Login a user
         * @param req
         * @param res
         * @param next
         */
        this.login = (req, res, next) => {
            const { email, password } = req.body;
            const ipAddress = req.connection.remoteAddress;
            console.log("ip:" + ipAddress);
            this._loginUser(email, password, ipAddress).then(() => {
                const token = jwt.sign({ email: email, dateCreated: new Date() }, sk);
                // console.log("jwt token:" + tk);
                res.status(200).json({
                    success: true,
                    msg: "Login successful",
                    token
                });
            }).catch((resp) => {
                console.log("failed to login-catch code:" + resp["statusCode"]);
                res.status(400).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * Initiate password reset
         * @param req
         * @param res
         * @param next
         */
        this.initiatePasswordReset = (req, res, next) => {
            const { email } = req.body;
            console.log("email:" + email);
            this._sendOTP(email).then((resp) => {
                res.status(200).json({
                    success: true,
                    msg: "password reset initiated, please check your email for further instructions"
                });
            }).catch((resp) => {
                res.status(parseInt(resp["statusCode"])).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * Reset Password
         * @param req
         * @param res
         * @param next
         */
        this.resetPassword = (req, res, next) => {
            const { otp, email, newPassword } = req.body;
            this.completePasswordReset(email, otp, newPassword).then((resp) => {
                res.status(200).json({
                    success: true,
                    msg: "password reset succesful"
                });
            }).catch((resp) => {
                res.status(parseInt(resp["statusCode"])).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * send sso
         * @param req
         * @param res
         * @param next
         */
        this.resendSSO = (req, res, next) => {
            const { otp, email, newPassword } = req.body;
            this.resendSSOToEmail(email).then((resp) => {
                res.status(200).json({
                    success: true,
                    msg: "SSO email sent"
                });
            }).catch((resp) => {
                res.status(parseInt(resp["statusCode"])).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * verify email address
         * @param req
         * @param res
         * @param next
         */
        this.verifyEmail = (req, res, next) => {
            const { sso, email } = req.body;
            this._verifyEmail(email, sso).then((resp) => {
                res.status(200).json({
                    success: true,
                    msg: 'email verified'
                });
            }).catch((resp) => {
                res.status(parseInt(resp["statusCode"])).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
        /**
         * verify token
         * @param req
         * @param res
         * @param next
         */
        this.verifyToken = (req, res, next) => {
            const { token } = req.body;
            jwt.verify(token, sk, function (err, decoded) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        msg: 'invalid token'
                    });
                }
                else {
                    res.status(200).json({
                        success: true,
                        msg: 'Token verified'
                    });
                }
            });
        };
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
