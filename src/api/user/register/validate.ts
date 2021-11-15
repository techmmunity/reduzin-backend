/* eslint-disable @typescript-eslint/no-magic-numbers */
import { V1RegisterUserInputSchema } from "./schemas/input.schema";

import { errorUtil } from "../../../utils/error";
import { yup } from "../../../utils/yup";

const schema = yup
	.object()
	.required()
	.strict()
	.shape({
		name: yup.string().strict().required().min(3).max(100),
		username: yup.string().strict().required().username(),
		email: yup.string().strict().required().email().max(100),
		password: yup.string().strict().required().password(),
	});

export const validate = (params: V1RegisterUserInputSchema) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
