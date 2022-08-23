import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
// import mongoose from "mongoose";
const { Sequelize } = require('sequelize');
import dotenv from "dotenv";
import requestLogger from "./utils/logger";
import AuthRouter from "./server/auth/auth.router";
import LinkRouter from "./server/link/link.router";


const env = dotenv.config();
const logger = morgan;
const app = express();

app.use(cors());
app.use(requestLogger);
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const prefix = "/api/v1";
app.use(prefix, AuthRouter);
app.use(prefix, LinkRouter);


app.get("/", (req, res) => {
	res.status(200).send("Welcome to Links Manager");

});


app.get("/api/v1/docs", (req, res) => {
	const fileDirectory = path.resolve(__dirname, ".", "public/");

	res.sendFile("docs/api.yml", { root: fileDirectory }, (err) => {
		res.end();

		if (err) throw err;
	});
});

const { PORT } = process.env;
const {POSTGRES_URL} = process.env;


const sequelize = new Sequelize(POSTGRES_URL) 
app.listen(PORT, () => {
	console.info(`Node server listening on port: ${PORT}`);
	console.log("connecting to database, please wait...");

	// Postgres connection
	sequelize.authenticate().then(() => { console.log('db uplink established...') }).catch((err:any) => {
		 console.log('db uplink failed...'+err)
	 });
 
});

