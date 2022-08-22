import * as express from "express";
import Middleware from "../../middlewares/middleware";
import LinkController from "./link.controller";


const LinkRouter = express.Router()
	.post("/vehicle/create", LinkController.createLink)
	;

export default LinkRouter;