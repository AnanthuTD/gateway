import { createRoute, RouteConfig } from ".";
import env from "@/infra/env";

export const emailRoutes = (): RouteConfig[] => [
	createRoute("/verify/email", false, {
		target: env.EMAIL_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
];
