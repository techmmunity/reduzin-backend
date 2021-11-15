import { id } from "../../url/validation";
import { V1FindAndUpdateUrlInputSchema } from "./schemas/input.schema";

import { errorUtil } from "../../../utils/error";
import { yup } from "../../../utils/yup";

const schema = yup.object().required().strict().shape({
	id: id.notRequired(),
});

export const validate = (params: V1FindAndUpdateUrlInputSchema) =>
	schema.validate(params).catch(err => errorUtil.badRequest(err.errors));
