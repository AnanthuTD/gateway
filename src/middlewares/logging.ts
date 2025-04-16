import morgan from "morgan";
import { Express } from "express";

const setupLogging = (app: Express) => {
	app.use(morgan("combined"));
};

const _setupLogging = setupLogging;
export { _setupLogging as setupLogging };
