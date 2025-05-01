import dayjs from "dayjs";
import { verify, decode } from "jsonwebtoken";
import env from "@/infra/env";

/**
 * Provider for managing and validating authentication tokens.
 *
 * @class
 * @implements {ITokenManagerProvider}
 */
export class TokenManagerProvider {
	/**
	 * Validates whether a token has expired based on the provided expiration timestamp.
	 *
	 * @param {number} expiresIn - The expiration timestamp of the token.
	 * @returns {boolean} True if the token is expired, false otherwise.
	 */
	validateTokenAge(expiresIn: number): boolean {
		return dayjs().isAfter(dayjs.unix(expiresIn));
	}

	/**
	 * Validates the authenticity and integrity of a given token using the API secret.
	 *
	 * @param {string} token - The token to validate.
	 * @returns {boolean} True if the token is valid, false otherwise.
	 */
	validateUserAccessToken(token: string): boolean {
		try {
			verify(token, env.USER_ACCESS_TOKEN_SECRET || "");
			return true;
		} catch (error) {
			return false;
		}
	}
	validateAdminAccessToken(token: string): boolean {
		try {
			verify(token, env.ADMIN_ACCESS_TOKEN_SECRET || "");
			return true;
		} catch (error) {
			return false;
		}
	}

	validateUserRefreshToken(token: string): boolean {
		try {
			verify(token, env.USER_REFRESH_TOKEN_SECRET || "");
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
	validateAdminRefreshToken(token: string): boolean {
		try {
			console.log(token);
			verify(token, env.ADMIN_REFRESH_TOKEN_SECRET || "");
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	getExpiresAt(token: string): number {
		const decoded = decode(token) as {
			exp: number;
		};
		return decoded.exp;
	}

	getPayload(token: string): {
		id: string;
		role: "user" | "admin";
		[key: string]: string;
	} {
		const decoded = decode(token) as {
			id: string;
			role: "user" | "admin";
			[key: string]: string;
		};
		return decoded;
	}
}
