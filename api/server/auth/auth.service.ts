// import  from "../user/user.model";
import { User} from "../user/user.model";
import _ from "lodash";

import bcrypt from "bcrypt";
import { DataResponse } from "../../utils/types";


export class AuthService {
	/**
	 * Register a user with firebase
	 * @param email
	 * @param password
	 * @param phoneNumber
	 * @param firstName
	 * @param lastName
	 */
	_createUser = async (email: string, phoneNumber: string, password: string, firstName: string, lastName: string): Promise<DataResponse> => {
		console.log("inside the service");
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		return new Promise((resolve, reject) => {
			console.log('making a promise')
			User.findOne({ where: { email: email } }).then((user: string | any[]) => {
				console.log('user:'+user)
				if (user.length > 0) {
					reject({ status: 403, msg: "user with this email exist!" });
				}
				const sso = Math.floor(100000 + Math.random() * 900000) + "-" + Math.floor(100000 + Math.random() * 900000) + "-" + Math.floor(100000 + Math.random() * 900000);
				User.create({
					email,
					phoneNumber,
					password: hashedPassword,
					firstName,
					lastName,
					sso: sso,
				}, (err: any, user: any) => {
					if (err) reject({ data: user, status: 501, msg: "this is bad!" });
					resolve({ data: user, status: 201, msg: "user created!" });
				});

			}).catch((err: any) => {
				console.log('error:'+err)
				reject({ status: 403, msg: err });
			});
		});
	};





	/**
	 * find user
	 * @param email
	 * @param password
	 * @param ipAddress
	 */
	_loginUser = async (email: string, password: string, ipAddress: string | undefined): Promise<DataResponse> => {
		return new Promise((resolve, reject) => {
			User.find({ email: email }).then(async (user: string | any[]) => {
				// console.log("user found:" + user);
				if (user.length > 0) {

					const dbPassword = String(_.map(user, _.property("password")));
					const match = await bcrypt.compare(password, dbPassword);
					if (match) {
						console.log("password matched:");console.log("user logged in:");
							resolve({ msg: "Login successful", status: 200, data: user, success: true });
							
					} else {
						reject({ msg: "wrong email/password", status: 401, success: false });
					}

				} else {
					console.log("user not found");
				}
				// resolve({'msg':'User dos not exist', 'status':401,  'success':false})
			});
			// .catch((err)=>{
			//     console.log('no user for the login:'+err)
			//     reject({'msg':err, 'status':401,  'success':false})
			// });
		});
	};



	

}

