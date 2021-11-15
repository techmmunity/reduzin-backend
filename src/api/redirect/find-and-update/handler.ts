import { findAndUpdate } from ".";
import { V1FindAndUpdateUrlInputSchema } from "./schemas/input.schema";
import { makeHandler } from "../../../helpers/make-handler";
import { makeResponse } from "../../../helpers/make-response";
import { UrlEntity } from "../../../database/url.entity";

export const handler = makeHandler(({ event, connection }) =>
	findAndUpdate(
		{
			urlRepository: connection.getRepository<UrlEntity>(UrlEntity),
			res: makeResponse(),
		},
		(event.pathParameters || {}) as V1FindAndUpdateUrlInputSchema,
	),
);
