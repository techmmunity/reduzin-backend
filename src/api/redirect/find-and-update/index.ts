import { Plus } from "@techmmunity/symbiosis";
import { V1FindAndUpdateUrlInputSchema } from "./schemas/input.schema";

import { getUserCountry } from "./helpers/get-user-country";
import { getOrigin } from "./helpers/get-origin";
import { validate } from "./validate";

import { UrlRepository } from "../../../database/url.entity";
import { ClickByDayRepository } from "../../../database/click-by-day.entity";
import { ClickByCountryRepository } from "../../../database/click-by-country.entity";
import { ClickByOriginRepository } from "../../../database/click-by-origin.entity";
import { errorUtil } from "../../../utils/error";
import { dayjs } from "../../../utils/dayjs";
import { Response } from "../../../types/response";

interface Injectables {
	urlRepository: UrlRepository;
	clickByDayRepository: ClickByDayRepository;
	clickByCountryRepository: ClickByCountryRepository;
	clickByOriginRepository: ClickByOriginRepository;
	res: Response;
	userIp: string;
	originUrl?: string;
}

export const findAndUpdate = async (
	{
		urlRepository,
		clickByDayRepository,
		clickByCountryRepository,
		clickByOriginRepository,
		res,
		userIp,
		originUrl,
	}: Injectables,
	params: V1FindAndUpdateUrlInputSchema,
) => {
	const { id } = await validate(params);

	if (!id) {
		return res.redirect(process.env.MAIN_SITE_URL);
	}

	const url = await urlRepository.findOne({
		where: {
			url: id,
		},
	});

	if (!url) {
		return errorUtil.notFound();
	}

	const country = getUserCountry(userIp);
	const origin = getOrigin(originUrl);

	await Promise.all([
		urlRepository.upsert(
			{
				url: id,
			},
			{
				// eslint-disable-next-line @typescript-eslint/no-magic-numbers
				usedTimes: Plus(1),
			},
		),
		clickByDayRepository.upsert(
			{
				urlId: `${url.id}#DAILY_CLICK`,
				day: dayjs().startOf("day").valueOf().toString(),
			},
			{},
		),
		clickByCountryRepository.upsert(
			{
				urlId: `${url.id}#COUNTRY_CLICK`,
				country,
			},
			{},
		),
		clickByOriginRepository.upsert(
			{
				urlId: `${url.id}#ORIGIN_CLICK`,
				origin,
			},
			{},
		),
	]);

	return res.redirect(url.longUrl);
};
