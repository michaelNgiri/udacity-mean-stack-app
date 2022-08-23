"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
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
        this._getUser = async (email) => {
            return new Promise((resolve, reject) => {
                user_model_1.User.find({ email: email }).then((user) => {
                    if (user) {
                        resolve({ data: user, status: 200, msg: "User found!" });
                    }
                }).catch((err) => {
                    reject({ status: 404, msg: err });
                });
            });
        };
        this._changeUserType = (email, userType) => {
            return new Promise((resolve, reject) => {
                const usertypes = ["dealer", "inspection", "delivery", "buyer", "admin"];
                if (usertypes.includes(userType)) {
                    user_model_1.User.updateOne({ email }, { userType }).then((user) => {
                        if (user) {
                            resolve({ status: 200, msg: "User type updated successfully" });
                        }
                    }).catch((err) => {
                        reject({ status: 404, msg: err });
                    });
                }
                else {
                    // eslint-disable-next-line quotes
                    reject({ status: 404, msg: `${userType} is not a valid usertype` });
                }
            });
        };
    }
}
exports.UserService = UserService;
