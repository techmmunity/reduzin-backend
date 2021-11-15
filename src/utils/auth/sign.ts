import { sign as signJwt } from "jsonwebtoken";
import { UserEntity } from "../../database/user.entity";
import { Token } from "../../types/token";

export const sign = (employeeData: UserEntity) => {
	const payload: Token = {
		userId: employeeData.id,
	};

	return signJwt(payload, process.env.JWT_PRIVATE_KEY);
};
