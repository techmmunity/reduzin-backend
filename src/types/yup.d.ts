/* eslint-disable capitalized-comments */

declare module "yup" {
	interface StringSchema {
		alphanumeric: () => this;
		username: () => this;
		password: () => this;
	}
}

/*
 * If this file has no import/export statements (i.e. is a script)
 * convert it into a module by adding an empty export statement.
 */
export {};
