import { VehicleService } from "./link.service";
import { Request, Response } from "express";
import { DataResponse } from "../../utils/types";




export class VehicleController extends VehicleService {

	/**
	 * Create a Vehicle record
	 * @param req
	 * @param res
	 * 
	 */
	createLink = (req: Request, res: Response) => {

		this._createLink(req.body).then((resp: DataResponse) => {
			res.status(resp["status"]).json({
				success: true,
				msg: "Vehicle created",
				vehicle: resp.data
			});
		}).catch((err) => {
			res.status(parseInt(err.status)).json({
				success: false,
				msg: err["msg"],
				err: err.error
			});
		});
	};

	
}



export default new VehicleController();
