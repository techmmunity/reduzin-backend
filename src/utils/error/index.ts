import { StatusCodeEnum } from "../../enums/status-code";

class CustomError extends Error {
	public statusCode: StatusCodeEnum;

	public constructor(statusCode: StatusCodeEnum, details?: Array<any>) {
		super(JSON.stringify(details));

		this.statusCode = statusCode;
	}
}

const throwError = (statusCode: StatusCodeEnum, details?: Array<any>) => {
	throw new CustomError(statusCode, details || []);
};

export const errorUtil = {
	notFound: (details?: Array<any>) =>
		throwError(StatusCodeEnum.NOT_FOUND, details),
	badRequest: (details?: Array<any>) =>
		throwError(StatusCodeEnum.BAD_REQUEST, details),
	conflict: (details?: Array<any>) =>
		throwError(StatusCodeEnum.CONFLICT, details),
	forbidden: (details?: Array<any>) =>
		throwError(StatusCodeEnum.FORBIDDEN, details),
};
