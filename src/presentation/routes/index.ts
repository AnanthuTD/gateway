import { userRoutes } from "./userRoutes";
import { notificationRoutes } from "./notificationRoutes";
import { collaborationRoutes } from "./collaborationRoutes";
import { videoRoutes } from "./videoRoutes";
import { emailRoutes } from "./emailRoutes";
import { adminRoutes } from "./adminRoutes";
import { subscriptionRoutes } from "./subscriptionRoutes";
import { Request } from "express";

interface ProxyConfig {
	target: string;
	changeOrigin: boolean;
	pathRewrite?:
		| { [key: string]: string }
		| ((path: string, req: Request) => string);
	ws?: boolean;
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

export const createRoute = (
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
	role,
});

const ROUTES: RouteConfig[] = [
	...userRoutes(),
	...adminRoutes(),
	...subscriptionRoutes(),
	...videoRoutes(),
	...notificationRoutes(),
	...emailRoutes(),
	...collaborationRoutes(),
];

export { ROUTES };
