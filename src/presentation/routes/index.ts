import { userRoutes } from "./userRoutes";
import { notificationRoutes } from "./notificationRoutes";
import { collaborationRoutes } from "./collaborationRoutes";
import { videoRoutes } from "./videoRoutes";
import { emailRoutes } from "./emailRoutes";
import { adminRoutes } from "./adminRoutes";
import { subscriptionRoutes } from "./subscriptionRoutes";
import { NextFunction, Request, Response } from "express";

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
	handlers?: {
		[method: string]: (
			req: Request,
			res: Response,
			next: NextFunction
		) => void | Promise<void>;
	};
}

export const createRoute = (
	url: string,
	auth: boolean,
	proxy: ProxyConfig,
	rateLimit: RateLimitConfig | null = null,
	methods: MethodConfig[] | null = null,
	role: "admin" | "user" = "user",
	handlers: {
		[method: string]: (
			req: Request,
			res: Response,
			next: NextFunction
		) => void | Promise<void>;
	} | null = null
): RouteConfig => ({
	url,
	auth,
	...(rateLimit && { rateLimit }),
	...(methods && { methods }),
	...(handlers && { handlers }),
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
