
import { integer } from "aws-sdk/clients/cloudfront";
import { DataResponse } from "../../utils/types";
import { Link } from "./link.model";


export class LinkService {
	/**
	 * Create Link
	 * @param link
	 * @param userID
	 * 
	 */
	_createLink = (link: any, userID: any): Promise<DataResponse> => {
			console.log('in the link service')
		console.log('link:' + link + ' userID:' + userID)
		console.log('short link:'+uniqueURL())
		return new Promise((resolve, reject) => {
			
			Link.create({ original_link:link, short_link:`https://links.io/${uniqueURL()}-${uniqueURL()}`, link_owner_id:userID })
			.then((link: any) => {
						if (link) {
							resolve({ success: true, data: link, status: 200, msg: "Link created successfully" });
						}
					}).catch((err: any) => {
						reject({ status: 403, error: err });

					});
		});
	};


	/**
	 * Find a Link
	 * @param linkID
	 */
	_getLink = async (linkID: string): Promise<DataResponse> => {
		console.log("getting a link");
		return new Promise((resolve, reject) => {
			console.log('making a promise')
			Link.findOne({ where: { id: linkID } }).then((link: string | any[]) => {
				if (link) {
					resolve({ data: link, status: 200, msg: "link found!" });
				} else {
					resolve({ data: link, status: 404, msg: "link with that id does not exist!" });
				}
	
			}).catch((err: any) => {
				console.log('error:'+err)
				reject({ status: 403, msg: err });
			});
		});
	};


	/**
	 * Find all Links belonging to a user
	 * @param linkID
	 */
	_getAllLinks = async (linkID: string): Promise<DataResponse> => {
		console.log("getting all links");
		return new Promise((resolve, reject) => {
			Link.findAll({ where: { link_owner_id: linkID } }).then((links: string | any[]) => {
				if (links) {
					resolve({ data: links, status: 200, msg: "links found!" });
				} else {
					resolve({ data: links, status: 404, msg: "no link yet!" });
				}
	
			}).catch((err: any) => {
				console.log('error:'+err)
				reject({ status: 403, msg: err });
			});
		});
	};

	/**
	 * Find a Link
	 * @param linkID
	 */
	_deleteLink = async (linkID: string): Promise<DataResponse> => {
		console.log("deleting a link:" + linkID);
		return new Promise((resolve, reject) => {
			Link.destroy({ where: { id: linkID } }).then(() => {
				resolve({status: 201, msg: "link deleted" });
			}).catch(() => {
				reject({ status: 403, msg: 'an error occurred, the link is not in our record' });
			})
			
		})
	
	};

	/**
	 * Find a Link
	 * @param linkID
	 * @param newLink
	 */
	_updateLink = async (linkID: string, newLink:string): Promise<DataResponse> => {
		console.log("updating a link:" + linkID);
		return new Promise((resolve, reject) => {
		Link.update({ original_link: newLink },{ where: { id: 1 } })
			.then((link: any) => {
				resolve({ success: true, data: link, status: 200, msg: "Link updated successfully" });
			})
			.catch((err: any) => {
				console.log(err)
				reject({ status: 403, msg: 'an error occurred, the link is not in our record' });
			})
		})
	
	};

	

}
const uniqueURL=()=>{
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (let i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
	}