import { StatusCodeEnum } from "../enums/status-code";
import { Response } from "../types/response";

export const makeResponse = (): Response => {
	return {
		redirect: (url: string) => ({
			headers: {
				"location": url,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				"access-control-allow-origin": "*",
			},
			statusCode: StatusCodeEnum.REDIRECT,
		}),
	};
};
