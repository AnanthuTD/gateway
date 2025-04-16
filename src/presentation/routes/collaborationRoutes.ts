import { createRoute, RouteConfig } from ".";
import env from "@/infra/env";

export const collaborationRoutes = (): RouteConfig[] => [
	createRoute("/invitations/accept", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
	createRoute("/permissions/share-file", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),

	createRoute(
		"/collaboration/permissions/:spaceId/space/:userId/isMember",
		false,
		{
			target: env.COLLABORATION_SERVICE_API,
			changeOrigin: true,
			pathRewrite: function (path, req) {
				return req.originalUrl;
			},
		}
	),

	createRoute("/collaboration", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
	}),

	createRoute("/workspaces/selected", false, {
		target: env.COLLABORATION_SERVICE_API + "/workspaces/selected",
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
	createRoute("/workspaces/:userId/selected", false, {
		target: env.COLLABORATION_SERVICE_API + "/workspaces/:",
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
	createRoute("/invitations/reject", false, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
	createRoute("/invitations", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
	createRoute("/workspaces", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
	createRoute("/spaces", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
	createRoute("/folders", true, {
		target: env.COLLABORATION_SERVICE_API,
		changeOrigin: true,
		pathRewrite: function (path, req) {
			return req.originalUrl;
		},
	}),
];
