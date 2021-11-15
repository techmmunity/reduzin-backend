import type { Connection } from "@techmmunity/symbiosis-dynamodb";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { StatusCodeEnum } from "../enums/status-code";
import { connect } from "../config/dynamodb";
import { LambdaResponse } from "../types/aws";
import { Route } from "../types/route";

export const makeHandler =
	(func: Route) =>
	async (
		event: APIGatewayProxyEvent,
		context: Context,
	): Promise<LambdaResponse> => {
		let connection = {} as Connection;

		try {
			connection = await connect();

			const result = await func({
				event,
				context,
				connection,
			});

			return {
				...result,
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					"Access-Control-Allow-Origin": "*",
					...(result.headers || {}),
				},
			};
		} catch (err: any) {
			await connection.close();

			return {
				headers: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					"Access-Control-Allow-Origin": "*",
				},
				statusCode: err.statusCode || StatusCodeEnum.INTERNAL,
				body: JSON.stringify({
					error: err.message,
				}),
			};
		}
	};
