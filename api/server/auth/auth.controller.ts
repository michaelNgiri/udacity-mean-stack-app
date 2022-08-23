import { NextFunction, Request, Response } from "express";
require("dotenv").config();
import { AuthService } from "./auth.service";
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
import _ from "lodash";
import { DataResponse } from "../../utils/types";
const sk = process.env.JWT_KEY;


export class AuthController extends AuthService {

	/**
	 * Signup a user
	 * @param req
	 * @param res
	 * @param next
	 */
	createUser = (req: Request, res: Response, next: NextFunction): void => {
		console.log("secret key:" + sk);

		const { firstName, lastName, email,  password } = req.body;
		console.log(req.body);
		this._createUser(email, password, firstName, lastName).then((resp: DataResponse) => {
			console.log('back from service into the controller...')
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
	login = (req: Request, res: Response, next: NextFunction): void => {
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
	getUser = (req: Request, res: Response, next: NextFunction): void => {
		const { id: id } = req.params;
		console.log(req.params)
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
export default new AuthController();
