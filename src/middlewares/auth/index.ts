import { Request, Response, NextFunction, Express } from "express";
import { RouteConfig } from "@/presentation/routes";
import { ensureAdminAuthenticated } from "./ensureAdminAuthenticated";
import { ensureUserAuthenticated } from "./ensureUserAuthenticated";

export const setupAuth = (app: Express, routes: RouteConfig[]) => {
	routes.forEach((r) => {
		app.use(r.url, (req: Request, res: Response, next: NextFunction) => {
	
			if (!r.methods) {
				if (r.auth) {
					const protect =
						r.role === "admin"
							? ensureAdminAuthenticated
							: ensureUserAuthenticated;
					return protect(req, res, next);
				}
				return next();
			}

			const methodConfig = r.methods.find(
				(m) =>
					m.method === req.method ||
					(Array.isArray(m.method) && m.method.includes(req.method))
			) || { auth: false };

			if (methodConfig.auth) {
				const protect =
					methodConfig.role === "admin"
						? ensureAdminAuthenticated
						: ensureUserAuthenticated;
				return protect(req, res, next);
			}

			next();
		});
	});
};
