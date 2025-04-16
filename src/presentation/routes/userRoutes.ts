import { createRoute, RouteConfig } from ".";
import env from "@/infra/env";

export const userRoutes = (): RouteConfig[] => [
	createRoute(
		"/users/auth",
		false,
		{
			target: env.USER_SERVICE_API + "/api/users/auth",
			changeOrigin: true,
		},
		{ windowMs: 15 * 60 * 1000, max: 20 }
	),

	createRoute(
		"/users/profile",
		true,
		{
			target: env.USER_SERVICE_API + "/api/users/profile",
			changeOrigin: true,
		},
		{ windowMs: 15 * 60 * 1000, max: 20 }
	),

	createRoute(
		"/users/limits",
		true,
		{
			target: env.USER_SERVICE_API + "/api/users/limits",
			changeOrigin: true,
		},
		{ windowMs: 15 * 60 * 1000, max: 20 }
	),
];
