import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const requestId = uuidv4();
	console.info(
		`Request:${requestId}-start=> Method: ${req.method}; URL: ${req.originalUrl}`
	);
	const startTime = new Date().getTime();
	res.on("finish", () => {
		const timeSpan = new Date().getTime() - startTime;
		const content = `Request:${requestId}-end=>  Method: ${req.method}; URL: ${req.originalUrl}; Response: ${res.statusCode}; Timespan: ${timeSpan}\n`;
		fs.writeFileSync("logger.txt", content, {
			encoding: "utf8",
			flag: "a+",
			mode: 0o666
		});

		// console.info(
		// 	`Request:${requestId}-end=>  Method: ${req.method}; URL: ${req.originalUrl}; Response: ${res.statusCode}; Timespan: ${timeSpan}`
		// );
	});

	next();
};

export default requestLogger;