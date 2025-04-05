import morgan from "morgan";

const setupLogging = (app) => {
    app.use(morgan('combined'));
}

const _setupLogging = setupLogging;
export { _setupLogging as setupLogging };