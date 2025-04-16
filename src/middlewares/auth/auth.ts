import { ensureAdminAuthenticated } from "./ensureAdminAuthenticated";
import { ensureUserAuthenticated } from "./ensureUserAuthenticated";

export const auth = (req, res, next, route) => {
	if (!route.methods) {
		if (route.auth) {
			const protect =
				route.role === "admin" ? ensureAdminAuthenticated : ensureUserAuthenticated;
			return protect(req, res, next);
		}
		return next();
	}

	const methodConfig = route.methods.find(
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

  next()
};
