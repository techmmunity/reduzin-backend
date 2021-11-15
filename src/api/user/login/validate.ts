/* eslint-disable @typescript-eslint/no-magic-numbers */
import { V1LoginUserInputSchema } from "./schemas/input.schema";

import { errorUtil } from "../../../utils/error";
import { yup } from "../../../utils/yup";

const schema = yup.object().required().strict().shape({
	username: yup.string().strict().required().username(),
	password: yup.string().strict().required().password(),
});

export const validate = (params: V1LoginUserInputSchema) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
