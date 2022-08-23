import * as express from "express";
import AuthController from "./auth.controller";


const AuthRouter = express.Router()
	.post("/auth/register", AuthController.createUser)
	.post("/auth/login", AuthController.login)
	.get("/auth/user/:id", AuthController.getUser)
	;

export default AuthRouter;