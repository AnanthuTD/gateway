import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxies = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}

const _setupProxies = setupProxies;
export { _setupProxies as setupProxies };