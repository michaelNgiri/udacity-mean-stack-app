import { NextFunction, Request, Response } from "express";
require("dotenv").config();
import { UserService } from "./user.service";
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
import _ from "lodash";
import { DataResponse } from "../../utils/types";




export class UserController extends UserService {

	/**
	 * Get a user
	 * @param req
	 * @param res
	 * @param next
	 */
	getUser = (req: Request, res: Response) => {

		const { email } = req.params;

		this._getUser(email).then((resp: DataResponse) => {
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
export default new UserController();
