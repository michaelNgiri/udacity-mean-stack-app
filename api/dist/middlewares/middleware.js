"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const user_model_1 = require("../server/user/user.model");
const lodash_1 = __importDefault(require("lodash"));
const jwt = require("jsonwebtoken");
const sk = process.env.JWT_KEY;
class Middleware {
    constructor() {
        /**
         * Check validity of token
         * @param token
         *
         */
        this.checkToken = (req, res, next) => {
            const { token } = req.headers;
            jwt.verify(token, sk, (err, decoded) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        msg: "invalid token"
                    });
                }
                else {
                    next();
                }
            });
        };
        this.checkUserTypeAdmin = (req, res, next) => {
            const { token } = req.headers;
            jwt.verify(token, sk, (err, decoded) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        msg: "invalid token"
                    });
                }
                else {
                    user_model_1.User.find({ email: decoded.email }).then((user) => {
                        const dbUserType = String(lodash_1.default.map(user, lodash_1.default.property("userType")));
                        if (dbUserType === "admin") {
                            next();
                        }
                        else {
                            res.status(400).json({
                                success: false,
                                msg: "User is not an admin"
                            });
                        }
                    }).catch((err) => {
                        res.status(400).json({
                            success: false,
                            msg: "User does not exist",
                            error: err
                        });
                    });
                }
            });
        };
    }
}
exports.Middleware = Middleware;
exports.default = new Middleware();
