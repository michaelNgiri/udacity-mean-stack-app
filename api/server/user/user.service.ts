import { DataResponse} from "../../utils/types";
import { User } from "./user.model";
import { Link } from "../link/link.model";
import _ from "lodash";


// import _ from "lodash";

export class UserService {
	/**
	 * Register a user with firebase
	 * @param email
	 * @param password
	 * @param phoneNumber
	 * @param firstName
	 * @param lastName
	 */
	_getUser = async (email: string): Promise<DataResponse> => {
		return new Promise((resolve, reject) => {
			User.find({ email: email }).then((user: any) => {
				if (user) {
					resolve({ data: user, status: 200, msg: "User found!" });
				}
			}).catch((err: Error) => {
				reject({ status: 404, msg: err });
			});
		});
	};

	_changeUserType = (email: string, userType: string): Promise<DataResponse> => {
		return new Promise((resolve, reject) => {
			const usertypes = ["dealer", "inspection", "delivery", "buyer", "admin"];
			if (usertypes.includes(userType)) {
				User.updateOne({ email }, { userType }).then((user: any) => {
					if (user) {
						resolve({ status: 200, msg: "User type updated successfully" });

					}
				}).catch((err: any) => {
					reject({ status: 404, msg: err });

				});
			} else {
				// eslint-disable-next-line quotes
				reject({ status: 404, msg: `${userType} is not a valid usertype` });

			}
		});
	};





}

