import { register } from ".";
import { V1RegisterUserInputSchema } from "./schemas/input.schema";
import { makeHandler } from "../../../helpers/make-handler";
import { UserEntity } from "../../../database/user.entity";
import { StatusCodeEnum } from "../../../enums/status-code";

export const handler = makeHandler(
	[UserEntity],
	async ({ event, connection }) => {
		const result = await register(
			{
				userRepository: connection.getRepository<UserEntity>(UserEntity),
			},
			(event.body || {}) as V1RegisterUserInputSchema,
		);

		return {
			statusCode: StatusCodeEnum.SUCCESS,
			body: JSON.stringify(result),
		};
	},
);
