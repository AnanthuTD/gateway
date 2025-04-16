import express from "express";

import { ROUTES } from "./presentation/routes";

import { setupLogging } from "./middlewares/logging";
import { setupRateLimit } from "./middlewares/ratelimit";
import { setupAuth } from "./middlewares/auth/index";
import { setupProxies } from "./middlewares/proxy";
import env from "./infra/env";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const app = express();
const port = env.PORT;

app.use(cookieParser());
app.use(compression());
app.use(cors());

app.use((req, res, next) => {
	console.log("================================");
	console.log(req.originalUrl);
	console.log("================================");
	next();
});

app.set("trust proxy", 1);

setupLogging(app);
// setupRateLimit(app, ROUTES);
// setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
	console.log(`Gateway listening at http://localhost:${port}`);
});
