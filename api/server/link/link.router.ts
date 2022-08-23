import * as express from "express";
import linkController from "./link.controller";
import LinkController from "./link.controller";


const LinkRouter = express.Router()
	.post("/link/create", LinkController.createLink)
	.get("/link/:linkID", LinkController.getLink)
	.delete('/link/:linkID/delete', LinkController.deleteLink)
	.patch('/link/update', LinkController.updateLink)
	;

export default LinkRouter;