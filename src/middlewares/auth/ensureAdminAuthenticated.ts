import { AuthMessages } from "@/domain/enums/AuthMessages";
import { TokenManagerProvider } from "@/infra/providers/TokenManager";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
	id: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: TokenPayload;
		}
	}
}

/**
 * Middleware to ensure that the incoming request is authenticated.
 * Checks for the presence of an authorization token and its validity.
 *
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Response | void} Returns a response with an error message or proceeds to the next middleware.
 */
export const ensureAdminAuthenticated = (
	request: Request,
	response: Response,
	next: NextFunction
): Response | void => {
	const cookieToken = request.cookies.accessToken;
	const authHeader = request.headers.authorization;
	const bearerToken = authHeader?.startsWith("Bearer ")
		? authHeader.split(" ")[1]
		: null;

	if (!cookieToken && !bearerToken) {
		response.status(401).json({
			message: AuthMessages.AuthorizationHeaderMissing,
		});
		return;
	}

	const tokenManager = new TokenManagerProvider();

	let token: null | string = null;

	try {
		if (bearerToken && tokenManager.validateAdminAccessToken(bearerToken)) {
			token = bearerToken;
		} else if (
			cookieToken &&
			tokenManager.validateAdminAccessToken(cookieToken)
		) {
			token = cookieToken;
		} else {
			response.status(401).json({
				message: AuthMessages.TokenInvalidOrExpired,
			});
			return;
		}

		const payload = tokenManager.getPayload(token!);

		if (!payload || typeof payload !== "object" || !payload.id) {
			return response.status(401).json({
				message: AuthMessages.TokenInvalidOrExpired,
			});
		}

		request.user = payload as TokenPayload;
		next();
		return;
	} catch (error) {
		console.error("Authentication error:", error);
		response.status(401).json({
			message: AuthMessages.TokenInvalidOrExpired,
		});
		return;
	}
};
