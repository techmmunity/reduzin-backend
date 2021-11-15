import { StatusCodeEnum } from "../enums/status-code";

export interface LambdaResponse {
	headers: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		"Access-Control-Allow-Origin": "*";
	};
	statusCode: StatusCodeEnum;
	body?: string;
}
