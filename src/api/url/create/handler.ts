import { create } from ".";
import { V1CreateUrlInputSchema } from "./schemas/input.schema";
import { makeHandler } from "../../../helpers/make-handler";
import { validateAuth } from "../../../helpers/validate-auth";
import { UrlEntity } from "../../../database/url.entity";
import { getUserData } from "../../../utils/auth/get-user-data";
import { StatusCodeEnum } from "../../../enums/status-code";

export const handler = makeHandler(async ({ event, connection }) => {
	validateAuth(event);

	await create(
		{
			urlRepository: connection.getRepository<UrlEntity>(UrlEntity),
			userData: getUserData(event),
		},
		(event.body || {}) as V1CreateUrlInputSchema,
	);

	return {
		statusCode: StatusCodeEnum.CREATED,
	};
});
