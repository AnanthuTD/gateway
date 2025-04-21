import { createRoute, RouteConfig } from ".";
import env from "@/infra/env";

export const notificationRoutes = (): RouteConfig[] => [
	createRoute("/notifications", true, {
		target: env.NOTIFICATION_SERVICE_API + '/api',
		changeOrigin: true,
	}),
];
