import { APIGatewayProxyEvent } from "aws-lambda";
import { decode } from "jsonwebtoken";
import { Token } from "../../types/token";

export const getUserData = (req: APIGatewayProxyEvent) => {
	const token = req.headers.authorization!.replace("Bearer ", "");

	const decodedPayload = decode(token);

	return decodedPayload as Token;
};
