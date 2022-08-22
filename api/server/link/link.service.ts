
import { DataResponse } from "../../utils/types";
import { Link } from "./link.model";




export class VehicleService {
	/**
	 * Create Link
	 * @param VehicleDetails
	 * 
	 */
	_createLink = (data:any ): Promise<DataResponse> => {
		return new Promise((resolve, reject) => {
			if (!data.vehicleType) {
				reject({ status: 403, msg: "Vehicle Specs not available" });
			}
			Link.create({ data }).then((veh: any) => {
						if (veh) {
							resolve({ success: true, data: veh, status: 200, msg: "Vehicle created successfully" });
						}
					}).catch((err: any) => {
						reject({ status: 403, error: err });

					});
		});
	};

}