import env from "@/infra/env.ts";

interface ProxyConfig {
	target: string;
	changeOrigin: boolean;
	pathRewrite?: { [key: string]: string };
}

interface RateLimitConfig {
	windowMs: number;
	max: number;
}

interface MethodConfig {
	method: string | string[];
	auth: boolean;
	role?: "admin" | "user";
}

export interface RouteConfig {
	url: string;
	auth: boolean;
	proxy: ProxyConfig;
	rateLimit?: RateLimitConfig;
	methods?: MethodConfig[];
	role?: "admin" | "user";
}

const createRoute = (
	url: string,
	auth: boolean,
	proxy: ProxyConfig,
	rateLimit: RateLimitConfig | null = null,
	methods: MethodConfig[] | null = null,
	role: "admin" | "user" = "user"
): RouteConfig => ({
	url,
	auth,
	...(rateLimit && { rateLimit }),
	...(methods && { methods }),
	proxy,
	role: role,
});

const userRoutes = (): RouteConfig[] => [
	// User routes
	createRoute(
		"/users/auth",
		false,
		{
			target: env.USER_SERVICE_API,
			changeOrigin: true,
			pathRewrite: { "^/users": "/api/users" },
		},
		{ windowMs: 15 * 60 * 1000, max: 20 }
	),
	createRoute(
		"/users",
		true,
		{
			target: env.USER_SERVICE_API,
			changeOrigin: true,
			pathRewrite: { "^/users": "/api/users" },
		},
		{ windowMs: 15 * 60 * 1000, max: 20 }
	),

	// Subscription routes
	createRoute(
		"/subscriptions/plans",
		false,
		{
			target: env.USER_SERVICE_API,
			changeOrigin: true,
			pathRewrite: { "^/subscriptions": "/api/subscriptions" },
		},
		null,
		[
			{ method: "GET", auth: false },
			{ method: ["POST", "PATCH"], auth: true, role: "admin" },
		]
	),
	createRoute("/subscriptions/webhooks", false, {
		target: env.USER_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/subscriptions": "/api/subscriptions" },
	}),
	createRoute("/subscriptions", true, {
		target: env.USER_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/subscriptions": "/api/subscriptions" },
	}),

	// Admin routes
	createRoute(
		"/admin/auth",
		false,
		{
			target: env.USER_SERVICE_API,
			changeOrigin: true,
			pathRewrite: { "^/admin": "/api/admin" },
		},
		{ windowMs: 15 * 60 * 1000, max: 20 }
	),
	createRoute(
		"/admin",
		true,
		{
			target: env.USER_SERVICE_API,
			changeOrigin: true,
			pathRewrite: { "^/admin": "/api/admin" },
		},
		{ windowMs: 15 * 60 * 1000, max: 20 },
		[],
		"admin"
	),
];

// Video service routes
const videoRoutes = (): RouteConfig[] => [
	createRoute("/videos/:videoId/preview", false, {
		target: env.VIDEO_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/videos": "/api" },
	}),
	createRoute("/videos", true, {
		target: env.VIDEO_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/videos": "/api" },
	}),
];

// Notification service routes
const notificationRoutes = (): RouteConfig[] => [
	createRoute("/notifications", true, {
		target: env.NOTIFICATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/notifications": "/api" },
	}),
];

// Email service routes
const emailRoutes = (): RouteConfig[] => [
	createRoute("/emails/verify/email", false, {
		target: env.EMAIL_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/emails": "/api" },
	}),
];

// Collaboration service routes
const collaborationRoutes = (): RouteConfig[] => [
	// Public routes
	createRoute("/invitation/accept", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),
	createRoute("/collaboration/permissions/share-file", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/collaboration": "" },
	}),
	createRoute(
		"/collaboration/permissions/:spaceId/space/:userId/isMember",
		false,
		{
			target: env.COLLABORATION_SERVICE_API,
			changeOrigin: true,
			pathRewrite: { "^/collaboration": "" },
		}
	),
	createRoute("/collaboration", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: { "^/collaboration": "" },
	}),
	createRoute("/workspace/selected", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),
	createRoute("/workspace/:userId/selected", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),
	createRoute("/invitation/reject", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),

	// Protected routes
	createRoute("/invitation", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),
	createRoute("/workspace", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),
	createRoute("/space", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),
	createRoute("/folder", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),
];

// Combine all routes
const ROUTES: RouteConfig[] = [
	...userRoutes(),
	...videoRoutes(),
	...notificationRoutes(),
	...emailRoutes(),
	...collaborationRoutes(),
];

export { ROUTES };
