/* eslint-disable @typescript-eslint/no-magic-numbers */
import { V1CreateUrlInputSchema } from "./schemas/input.schema";

import { id } from "../validation";
import { errorUtil } from "../../../utils/error";
import { yup } from "../../../utils/yup";

const schema = yup
	.object()
	.required()
	.strict()
	.shape({
		id: id.notRequired(),
		name: yup.string().strict().notRequired().max(500),
		url: yup.string().strict().required().url().max(2500),
	});

export const validate = (params: V1CreateUrlInputSchema) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
