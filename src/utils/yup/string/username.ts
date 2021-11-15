/* eslint-disable @typescript-eslint/no-invalid-this */

import { isUsername } from "@techmmunity/utils";

import { Yup } from "..";

export const username = (yup: Yup) => {
	yup.addMethod(yup.string, "username", function () {
		return this.test({
			name: "username",
			message: "${path} must be a valid username",
			test: value => (value ? isUsername(value) : true),
		});
	});
};
