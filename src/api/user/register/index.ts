import { V1RegisterUserInputSchema } from "./schemas/input.schema";

import { validate } from "./validate";

import { UserEntity, UserRepository } from "../../../database/user.entity";
import { errorUtil } from "../../../utils/error";
import { sign } from "../../../utils/auth/sign";

interface Injectables {
	userRepository: UserRepository;
}

export const register = async (
	{ userRepository }: Injectables,
	params: V1RegisterUserInputSchema,
) => {
	const data = await validate(params);

	const userWithSameEmail = await userRepository.findOne({
		where: {
			email: data.email,
		},
		index: "email_index",
	});

	if (userWithSameEmail) {
		return errorUtil.forbidden();
	}

	const userWithSameUsername = await userRepository.findOne({
		where: {
			username: data.username,
		},
		index: "username_index",
	});

	if (userWithSameUsername) {
		return errorUtil.forbidden();
	}

	const result = await userRepository.save<UserEntity>(data);

	return {
		authToken: sign(result),
	};
};
