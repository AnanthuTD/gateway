import { cleanEnv, str, port, url } from "envalid";

const env = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ["development", "test", "production", "staging"],
	}),
	PORT: port(),
	COLLABORATION_API_URL: url(),

	USER_ACCESS_TOKEN_SECRET: str(),
	ADMIN_ACCESS_TOKEN_SECRET: str(),
	
	GRAFANA_HOST: str(),
	LOKI_API_KEY: str(),
	LOKI_USER_ID: str(),

	USER_SERVICE_API: url(),
	ADMIN_SERVICE_API: url(),
  COLLABORATION_SERVICE_API: url(),
	VIDEO_SERVICE_API: url(),
	NOTIFICATION_SERVICE_API: url(),
	EMAIL_SERVICE_API: url(),
	SUBSCRIPTION_SERVICE_API: url(),
});

export default env;
