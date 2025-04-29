import { Request, Response, NextFunction, type Express } from "express";
import { RouteConfig } from "@/presentation/routes";
import { createProxyMiddleware } from "http-proxy-middleware";
import { auth } from "./auth/auth";

const setupProxies = (app: Express, routes: RouteConfig[]) => {
	routes.forEach((r) => {
		// Logging middleware
		app.use(r.url, (req, res, next) => {
			console.log("===================================");
			console.log(`Processing ${r.url}`, r);
			console.log("===================================");
			next();
		});

		// Authentication middleware
		app.use(r.url, (req, res, next) => auth(req, res, next, r));

		// Check for custom handlers
		if (r.handlers) {
			Object.keys(r.handlers).forEach((method) => {
				const handler = r.handlers![method];
				// Register handler for specific HTTP method
				app[method.toLowerCase() as keyof Express](
					r.url,
					(req: Request, res: Response, next: NextFunction) => {
						handler(req, res, next);
					}
				);
			});
		}

		// Proxy middleware for routes without handlers or unmatched methods
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

		// Only apply proxy if no handler matches the request method
		app.use(r.url, (req, res, next) => {
			const method = req.method.toLowerCase();
			if (r.handlers && r.handlers[method]) {
				// Skip proxy if a handler exists for this method
				next();
			} else {
				// Apply proxy for unmatched methods
				proxy(req, res, next);
			}
		});
	});
};

const _setupProxies = setupProxies;
export { _setupProxies as setupProxies };
