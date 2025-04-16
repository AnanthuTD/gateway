import { createRoute, RouteConfig } from ".";
import env from "@/infra/env";

export const subscriptionRoutes = (): RouteConfig[] => [
	createRoute(
		"/subscriptions/public",
		false,
		{
			target: env.USER_SERVICE_API + "/api/subscriptions/public",
			changeOrigin: true,
		},
		null
	),

	createRoute("/subscriptions/webhooks", false, {
		target: env.USER_SERVICE_API + "/api/subscriptions/webhooks",
		changeOrigin: true,
	}),

	createRoute(
		"/subscriptions/admin",
		true,
		{
			target: env.USER_SERVICE_API + "/api/subscriptions/admin",
			changeOrigin: true,
		},
		null,
		null,
		"admin"
	),

	createRoute(
		"/subscriptions",
		true,
		{
			target: env.USER_SERVICE_API + "/api/subscriptions",
			changeOrigin: true,
		},
		null
	),
];
