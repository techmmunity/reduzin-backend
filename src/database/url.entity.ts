import {
	Column,
	Entity,
	Index,
	InsertDateColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-dynamodb";

@Entity()
export class UrlEntity {
	@PrimaryColumn()
	public id: string;

	@Column()
	public name?: string;

	@Column()
	public url: string;

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
