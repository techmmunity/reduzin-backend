/* eslint-disable @typescript-eslint/no-magic-numbers */
import { yup } from "../../utils/yup";

export const id = yup.string().strict().min(1).max(60).alphanumeric();
