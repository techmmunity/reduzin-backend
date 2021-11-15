import { V1ListUrlInputSchema } from "./schemas/input.schema";

import { validate } from "./validate";

import { UrlRepository } from "../../../database/url.entity";
import { Token } from "../../../types/token";

interface Injectables {
	urlRepository: UrlRepository;
	userData: Token;
}

export const list = async (
	{ urlRepository, userData }: Injectables,
	params: V1ListUrlInputSchema,
) => {
	const { lastRecordId } = await validate(params);

	return urlRepository.find({
		where: {
			userId: userData.userId,
		},
		index: "user_id_index",
		startFrom: {
			id: lastRecordId,
		},
		take: 15,
	});
};
