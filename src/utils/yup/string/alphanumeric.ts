/* eslint-disable @typescript-eslint/no-invalid-this */

import { Yup } from "..";

export const alphanumeric = (yup: Yup) => {
	yup.addMethod(yup.string, "alphanumeric", function () {
		return this.test({
			name: "alphanumeric",
			message: "${path} must be a valid alphanumeric",
			test: value => (value ? /^[a-zA-Z0-9-]*$/.test(value) : true),
		});
	});
};
