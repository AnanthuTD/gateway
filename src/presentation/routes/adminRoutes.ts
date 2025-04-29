import { createRoute, RouteConfig } from ".";
import env from "@/infra/env";

export const adminRoutes = (): RouteConfig[] => [
  createRoute(
    "/admin/auth",
    false,
    {
      target: env.USER_SERVICE_API,
      changeOrigin: true,
      pathRewrite: { "^/": "/api/admin/auth/" },
    },
    { windowMs: 15 * 60 * 1000, max: 20 }
  ),
  createRoute(
    "/admin",
    true,
    {
      target: env.USER_SERVICE_API,
      changeOrigin: true,
      pathRewrite: { "^/": "/api/admin/" },
    },
    { windowMs: 15 * 60 * 1000, max: 20 },
    null,
    "admin"
  ),
]; 
