import express from "express";

import { ROUTES } from "./routes.js";

import { setupLogging } from "./middlewares/logging.js";
import { setupRateLimit } from "./middlewares/ratelimit.js";
import { setupAuth } from "./middlewares/auth/index.js";
import { setupProxies } from "./middlewares/proxy.js";

const app = express();
const port = 3000;

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
