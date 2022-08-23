"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
require("dotenv").config();
const user_service_1 = require("./user.service");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
class UserController extends user_service_1.UserService {
    constructor() {
        super(...arguments);
        /**
         * Get a user
         * @param req
         * @param res
         * @param next
         */
        this.getUser = (req, res) => {
            const { email } = req.params;
            this._getUser(email).then((resp) => {
                res.status(resp["status"]).json({
                    success: true,
                    msg: "User retrieved!",
                    user: resp.data
                });
            }).catch((resp) => {
                res.status(parseInt(resp.status)).json({
                    success: false,
                    msg: resp["msg"]
                });
            });
        };
    }
}
exports.UserController = UserController;
exports.default = new UserController();
