import { URL } from "url";

export const getOrigin = (originUrl?: string) => {
	if (originUrl) {
		const url = new URL(originUrl);

		return url.hostname || "UNKNOWN";
	}

	return "UNKNOWN";
};
