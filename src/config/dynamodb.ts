import { Connection } from "@techmmunity/symbiosis-dynamodb";

export const connect = async (entities: Array<any>) => {
	const connection = new Connection({
		entities,
		namingStrategy: {
			entity: "snake_case",
			column: "camelCase",
		},
		suffix: {
			entity: {
				remove: "Entity",
			},
		},
		databaseConfig: {
			region: "us-east-1",
			credentials: {
				accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
				secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
			},
		},
	});

	await connection.load();
	await connection.connect();

	return connection;
};
