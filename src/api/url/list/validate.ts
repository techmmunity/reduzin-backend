/* eslint-disable @typescript-eslint/no-magic-numbers */
import { V1ListUrlInputSchema } from "./schemas/input.schema";

import { id } from "../validation";
import { errorUtil } from "../../../utils/error";
import { yup } from "../../../utils/yup";

const schema = yup.object().required().strict().shape({
	lastRecordId: id.notRequired(),
});

export const validate = (params: V1ListUrlInputSchema) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
