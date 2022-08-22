import * as express from "express";
import Middleware from "../../middlewares/middleware";
import UserController from "./user.controller";


const UserRouter = express.Router()
	.get("/user/email/:email", [Middleware.checkToken], UserController.getUser)




	;

export default UserRouter;