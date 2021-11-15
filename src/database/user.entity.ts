import {
	Column,
	Entity,
	Index,
	InsertDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "@techmmunity/symbiosis";
import { Repository } from "@techmmunity/symbiosis-dynamodb";

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	public id: string;

	@Column()
	public name: string;

	@Index()
	@Column()
	public username: string;

	@Index()
	@Column()
	public email: string;

	@Column()
	public password: string;

	@InsertDateColumn()
	public createdAt: string;

	@UpdateDateColumn()
	public updatedAt: string;
}

export type UserRepository = Repository<UserEntity>;
