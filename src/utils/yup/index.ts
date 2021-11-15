/**
 *
 * Every Time that a function be added here,
 * you need to add the type to
 * the types/yup.d.ts file
 *
 */

import * as yup from "yup";
import { alphanumeric } from "./string/alphanumeric";
import { password } from "./string/password";
import { username } from "./string/username";

alphanumeric(yup);
username(yup);
password(yup);

export { yup };

export type Yup = typeof yup;
