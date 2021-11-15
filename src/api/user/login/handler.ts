import { login } from ".";
import { V1LoginUserInputSchema } from "./schemas/input.schema";
import { makeHandler } from "../../../helpers/make-handler";
import { UserEntity } from "../../../database/user.entity";
import { StatusCodeEnum } from "../../../enums/status-code";

export const handler = makeHandler(async ({ event, connection }) => {
	const result = await login(
		{
			userRepository: connection.getRepository<UserEntity>(UserEntity),
		},
		(event.body || {}) as V1LoginUserInputSchema,
	);

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify(result),
	};
});
