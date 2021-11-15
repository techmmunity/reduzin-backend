import {
	Column,
	Entity,
	Index,
	InsertDateColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from "@techmmunity/symbiosis";
import {
	ColumnExtraMetadata,
	Repository,
} from "@techmmunity/symbiosis-dynamodb";
import { v4 } from "uuid";

@Entity()
export class UrlEntity {
	@PrimaryColumn({
		comment: [
			"Shorted url alias",
			"(Ex: For the url `reduz.in/techmmunity` this column will have the value `techmmunity`)",
		].join(" "),
	})
	public url: string;

	@Index()
	@Column<ColumnExtraMetadata>({
		comment: "Real unique and immutable id",
		defaultValue: v4,
		extras: {
			sortKey: true,
		},
	})
	public id: string;

	@Column()
	public name?: string;

	@Column({
		comment: "Original url",
	})
	public longUrl: string;

	@Index()
	@Column()
	public userId: string;

	@Column({
		defaultValue: 0,
	})
	public usedTimes: number;

	@InsertDateColumn()
	public createdAt: string;

	@UpdateDateColumn()
	public updatedAt: string;
}

export type UrlRepository = Repository<UrlEntity>;
