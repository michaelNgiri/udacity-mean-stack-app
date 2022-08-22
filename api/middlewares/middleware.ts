import { NextFunction, Request, Response } from "express";
import { User } from "../server/user/user.model";
import _ from "lodash";
import { resolve } from "node:path/win32";
import { readdirSync } from "node:fs";


const jwt = require("jsonwebtoken");

const sk = process.env.JWT_KEY;

export class Middleware {

	/**
	 * Check validity of token
	 * @param token
	 * 
	 */
	checkToken = (req: Request, res: Response, next: NextFunction) => {
		const { token } = req.headers;

		jwt.verify(token, sk, (err: Error, decoded: any) => {
			if (err) {
				res.status(400).json({
					success: false,
					msg: "invalid token"
				});
			} else {
				next();
			}
		});
	};



	checkUserTypeAdmin = (req: Request, res: Response, next: NextFunction) => {
		const { token } = req.headers;

		jwt.verify(token, sk, (err: Error, decoded: { email: string }) => {
			if (err) {
				res.status(400).json({
					success: false,
					msg: "invalid token"
				});
			} else {
				User.find({ email: decoded.email }).then((user) => {
					const dbUserType = String(_.map(user, _.property("userType")));
					if (dbUserType === "admin") {
						next();
					} else {
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


export default new Middleware();


