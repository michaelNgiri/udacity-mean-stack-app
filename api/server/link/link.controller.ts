import { LinkService } from "./link.service";
import { NextFunction, Request, Response } from "express";
import { DataResponse } from "../../utils/types";




export class LinkController extends LinkService {

	/**
	 * Create a Short Link
	 * @param req
	 * @param res
	 * 
	 */
	createLink = (req: Request, res: Response) => {
		const { link, userID } = req.body;

			
		console.log('link:'+link+' userID:'+userID)
		this._createLink(link, userID).then((resp: DataResponse) => {
			res.status(resp["status"]).json({
				success: true,
				msg: "Link created",
				link: resp.data
			});
		}).catch((err) => {
			res.status(parseInt(err.status)).json({
				success: false,
				msg: err["msg"],
				err: err.error
			});
		});
	};


	/**
	 * Get a Link
	 * @param req
	 * @param res
	 * @param next
	 */
	getLink = (req: Request, res: Response, next: NextFunction): void => {
		const { linkID } = req.params;
		console.log(req.params)
		console.log("link id:" + linkID);
		this._getLink(linkID).then((data) => {
			// console.log("jwt token:" + tk);
			res.status(200).json({
				success: true,
				msg: "Link found",
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


	/**
	 * Get a Link
	 * @param req
	 * @param res
	 * @param next
	 */
	deleteLink = (req: Request, res: Response, next: NextFunction): void => {
		const { linkID } = req.params;
		console.log(req.params)
		console.log("link id:" + linkID);
		this._deleteLink(linkID).then((data) => {
			res.status(200).json({
				success: true,
				msg: "Link Deleted",
				user: data
			});
		}).catch((resp) => {
			console.log("Link deleting failed:" + resp["status"]);
			res.status(404).json({
				success: false,
				msg: resp["msg"],
			});
		});
	};

	/**
	 * Get a Link
	 * @param req
	 * @param res
	 * @param next
	 */
	updateLink = (req: Request, res: Response, next: NextFunction): void => {
		const { linkID, newLink, token } = req.body;
		console.log(req.body)
		console.log("link id:" + linkID);
		this._updateLink(linkID, newLink).then((data) => {
			res.status(200).json({
				success: true,
				msg: "Link Updated",
				data: data
			});
		}).catch((resp) => {
			console.log("Link updating failed:" + resp["status"]);
			res.status(404).json({
				success: false,
				msg: resp["msg"],
			});
		});
	};

	
}



export default new LinkController();
