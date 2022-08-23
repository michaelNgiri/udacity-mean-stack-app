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
            const { firstName, lastName, email, password } = req.body;
            console.log(req.body);
            this._createUser(email, password, firstName, lastName).then((resp) => {
                console.log('back from service into the controller...');
                res.status(resp.status).json({
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
            // console.log("ip:" + ipAddress);
            this._loginUser(email, password).then((data) => {
                const token = jwt.sign({ email: email, dateCreated: new Date() }, sk);
                // console.log("jwt token:" + tk);
                res.status(200).json({
                    success: true,
                    msg: "Login successful",
                    token,
                    data: data
                });
            }).catch((resp) => {
                console.log("failed to login-catch code:" + resp["status"]);
                res.status(400).json({
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
        this.getUser = (req, res, next) => {
            const { id: id } = req.params;
            console.log(req.params);
            console.log("user id:" + id);
            this._getUser(id).then((data) => {
                const token = jwt.sign({ id: id, dateCreated: new Date() }, sk);
                // console.log("jwt token:" + tk);
                res.status(200).json({
                    success: true,
                    msg: "User found",
                    token,
                    user: data
                });
            }).catch((resp) => {
                console.log("user not found:" + resp["status"]);
                res.status(404).json({
                    success: false,
                    msg: resp["msg"],
                });
            });
        };
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
