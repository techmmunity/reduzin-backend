import { Plus } from "@techmmunity/symbiosis";
import { V1FindAndUpdateUrlInputSchema } from "./schemas/input.schema";

import { validate } from "./validate";

import { UrlRepository } from "../../../database/url.entity";
import { errorUtil } from "../../../utils/error";
import { Response } from "../../../types/response";

interface Injectables {
	urlRepository: UrlRepository;
	res: Response;
}

export const findAndUpdate = async (
	{ urlRepository, res }: Injectables,
	params: V1FindAndUpdateUrlInputSchema,
) => {
	const { id } = await validate(params);

	if (!id) {
		return res.redirect(process.env.MAIN_SITE_URL);
	}

	const url = await urlRepository.findOne({
		where: {
			id,
		},
	});

	if (!url) {
		return errorUtil.notFound();
	}

	await urlRepository.upsert(
		{
			id,
		},
		{
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			usedTimes: Plus(1),
		},
	);

	return res.redirect(url.url);
};
