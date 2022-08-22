"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
require("dotenv").config();
const user_service_1 = require("./user.service");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const sk = process.env.JWT_KEY;
class UserController extends user_service_1.UserService {
    constructor() {
        super(...arguments);
        /**
         * Get a user
         * @param req
         * @param res
         * @param next
         */
        this.getUser = (req, res, next) => {
            console.log(req.header);
            const { email } = req.params;
            const { token } = req.headers;
            jwt.verify(token, sk, (err, decoded) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        msg: 'invalid token'
                    });
                }
                else {
                    this._getUser(email).then((resp) => {
                        // @ts-ignore
                        res.status(parseInt(resp["status"])).json({
                            success: true,
                            msg: "User retrieved!",
                            // @ts-ignore
                            user: resp["user"]
                        });
                    }).catch((resp) => {
                        res.status(parseInt(resp.status)).json({
                            success: false,
                            msg: resp["msg"]
                        });
                    });
                }
            });
        };
    }
}
exports.UserController = UserController;
exports.default = new UserController();
