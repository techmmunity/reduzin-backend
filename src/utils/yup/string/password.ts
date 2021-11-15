/* eslint-disable @typescript-eslint/no-invalid-this */

import { isStrongPassword } from "@techmmunity/utils";

import { Yup } from "..";

export const password = (yup: Yup) => {
	yup.addMethod(yup.string, "password", function () {
		return this.test({
			name: "password",
			message: "${path} must be a valid password",
			test: value => (value ? isStrongPassword(value) : true),
		});
	});
};
