import rateLimit from "express-rate-limit";

const setupRateLimit = (app, routes) => {
    routes.forEach(r => {
        if (r.rateLimit) {
            app.use(r.url, rateLimit(r.rateLimit));
        }
    })
}

const _setupRateLimit = setupRateLimit;
export { _setupRateLimit as setupRateLimit };