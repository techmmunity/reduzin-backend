import { findAndUpdate } from ".";
import { V1FindAndUpdateUrlInputSchema } from "./schemas/input.schema";
import { makeHandler } from "../../../helpers/make-handler";
import { makeResponse } from "../../../helpers/make-response";
import { UrlEntity } from "../../../database/url.entity";
import { ClickByDayEntity } from "../../../database/click-by-day.entity";
import { ClickByCountryEntity } from "../../../database/click-by-country.entity";
import { ClickByOriginEntity } from "../../../database/click-by-origin.entity";

export const handler = makeHandler(
	[UrlEntity, ClickByDayEntity, ClickByCountryEntity, ClickByOriginEntity],
	({ event, connection }) => {
		const userIp = event.requestContext.identity.sourceIp;
		const originUrl = event.headers.origin;

		return findAndUpdate(
			{
				urlRepository: connection.getRepository<UrlEntity>(UrlEntity),
				clickByDayRepository:
					connection.getRepository<ClickByDayEntity>(ClickByDayEntity),
				clickByCountryRepository:
					connection.getRepository<ClickByCountryEntity>(ClickByCountryEntity),
				clickByOriginRepository:
					connection.getRepository<ClickByOriginEntity>(ClickByOriginEntity),
				res: makeResponse(),
				userIp,
				originUrl,
			},
			(event.pathParameters || {}) as V1FindAndUpdateUrlInputSchema,
		);
	},
);
