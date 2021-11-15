import { V1LoginUserInputSchema } from "./schemas/input.schema";

import { validate } from "./validate";

import { UserRepository } from "../../../database/user.entity";
import { errorUtil } from "../../../utils/error";
import { sign } from "../../../utils/auth/sign";
import { compare } from "../../../utils/auth/compare";

interface Injectables {
	userRepository: UserRepository;
}

export const login = async (
	{ userRepository }: Injectables,
	params: V1LoginUserInputSchema,
) => {
	const { username, password } = await validate(params);

	const user = await userRepository.findOne({
		where: {
			username,
		},
		index: "username_index",
	});

	if (!user) {
		return errorUtil.forbidden();
	}

	const isSamePassword = compare(password, user.password);

	if (!isSamePassword) {
		return errorUtil.forbidden();
	}

	return {
		authToken: sign(user),
	};
};
