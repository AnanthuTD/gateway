import { createRoute, RouteConfig } from ".";
import env from "@/infra/env";

export const videoRoutes = (): RouteConfig[] => [
  createRoute(
    "/videos/ws",
    false,
    {
      target: env.COLLABORATION_SERVICE_API,
      changeOrigin: true,
      pathRewrite: { "^/": "/socket.io/" },
      ws: true,
    },
    null,
    null,
    "admin"
  ),
  createRoute("/videos/:videoId/preview", false, {
    target: env.VIDEO_SERVICE_API,
    changeOrigin: true,
    pathRewrite: function (path, req) {
      return req.originalUrl.replace(/^\/videos/, '');
    },
  }),
  createRoute("/videos", true, {
    target: env.VIDEO_SERVICE_API,
    changeOrigin: true,
    pathRewrite: { "^/": "/api/" },
  }),
];