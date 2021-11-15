import {
	Column,
	CountColumn,
	Entity,
	PrimaryColumn,
} from "@techmmunity/symbiosis";
import {
	ColumnExtraMetadata,
	Repository,
} from "@techmmunity/symbiosis-dynamodb";

@Entity("single_table_count_clicks")
export class ClickByOriginEntity {
	@PrimaryColumn()
	public urlId: string;

	@Column<ColumnExtraMetadata>({
		name: "sort_key",
		extras: {
			sortKey: true,
		},
	})
	public origin: string;

	@CountColumn(["insert", "update"])
	public totalClicks: number;
}

export type ClickByOriginRepository = Repository<ClickByOriginEntity>;
