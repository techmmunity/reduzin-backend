import { list } from ".";
import { V1ListUrlInputSchema } from "./schemas/input.schema";
import { makeHandler } from "../../../helpers/make-handler";
import { validateAuth } from "../../../helpers/validate-auth";
import { UrlEntity } from "../../../database/url.entity";
import { getUserData } from "../../../utils/auth/get-user-data";
import { StatusCodeEnum } from "../../../enums/status-code";

export const handler = makeHandler(async ({ event, connection }) => {
	validateAuth(event);

	const result = await list(
		{
			urlRepository: connection.getRepository<UrlEntity>(UrlEntity),
			userData: getUserData(event),
		},
		(event.queryStringParameters || {}) as unknown as V1ListUrlInputSchema,
	);

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify(result),
	};
});
