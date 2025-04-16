import { Request, type Express } from "express";
import { RouteConfig } from "@/presentation/routes";
import { createProxyMiddleware } from "http-proxy-middleware";
import { auth } from "./auth/auth";

const setupProxies = (app: Express, routes: RouteConfig[]) => {
	routes.forEach((r) => {
		app.use((req, res, next) => {
			console.log("===================================");
			console.log(`Proxying ${r.url}`, r);
			console.log("===================================");
			next()
		});

		// Authentication middleware
		app.use(r.url, (req, res, next) => auth(req, res, next, r));

		const proxy = createProxyMiddleware({
			...r.proxy,
			ws: r.proxy.ws || false,
			on: {
				proxyReq: (proxyReq, req: Request) => {
					if (r.auth && req.user) {
						const userInfo = JSON.stringify(req.user);
						proxyReq.setHeader("X-User-Info", userInfo);
					}
				},
			},
		});

		app.use(r.url, proxy);
	});
};

const _setupProxies = setupProxies;
export { _setupProxies as setupProxies };
