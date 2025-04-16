import { AuthMessages } from "@/domain/enums/AuthMessages";
import { TokenManagerProvider } from "@/infra/providers/TokenManager";


/**
 * Middleware to ensure that the incoming request is authenticated.
 * Checks for the presence of an authorization token and its validity.
 *
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Response | void} Returns a response with an error message or proceeds to the next middleware.
 */
export const ensureAdminAuthenticated = (request, response, next) => {
	const token = request.cookies.accessToken;

	if (!token) {
		response.status(401).json({
			message: AuthMessages.AuthorizationHeaderMissing,
		});
		return;
	}

	const tokenManager = new TokenManagerProvider();
	if (!tokenManager.validateAdminAccessToken(token)) {
		response.status(401).json({
			message: AuthMessages.TokenInvalidOrExpired,
		});
		return;
	}

	const payload = tokenManager.getPayload(token);

	request.user = payload;

	return next();
};
