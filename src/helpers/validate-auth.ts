import { APIGatewayProxyEvent } from "aws-lambda";
import { verify } from "../utils/auth/verify";
import { errorUtil } from "../utils/error";

export const validateAuth = (event: APIGatewayProxyEvent) => {
	const { authorization } = event.headers;

	if (!authorization) {
		return errorUtil.forbidden();
	}

	if (!authorization.startsWith("Bearer ")) {
		return errorUtil.forbidden();
	}

	const token = authorization.replace("Bearer ", "");

	if (!verify(token)) {
		return errorUtil.forbidden();
	}
};
