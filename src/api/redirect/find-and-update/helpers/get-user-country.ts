import { lookup } from "geoip-country";
import { isIpv4 } from "@techmmunity/utils";

export const getUserCountry = (userIp: string) => {
	if (isIpv4(userIp)) {
		const result = lookup(userIp);

		return result?.country || "UNKNOWN";
	}

	return "UNKNOWN";
};
