import { uid } from "uid";
import { V1CreateUrlInputSchema } from "./schemas/input.schema";

import { validate } from "./validate";

import { UrlRepository } from "../../../database/url.entity";
import { errorUtil } from "../../../utils/error";
import { Token } from "../../../types/token";

interface Injectables {
	urlRepository: UrlRepository;
	userData: Token;
}

export const create = async (
	{ urlRepository, userData }: Injectables,
	params: V1CreateUrlInputSchema,
) => {
	const data = await validate(params);

	if (data.url.startsWith(process.env.DOMAIN)) {
		return errorUtil.badRequest();
	}

	if (data.id) {
		const recordWithSameId = await urlRepository.findOne({
			where: {
				url: data.id,
			},
		});

		if (recordWithSameId) {
			return errorUtil.conflict(["Url with same id already exists"]);
		}
	}

	await urlRepository.save({
		...data,
		url: data.id || uid(),
		userId: userData.userId,
	});
};
