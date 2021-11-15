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
export class ClickByDayEntity {
	@PrimaryColumn()
	public urlId: string;

	@Column<ColumnExtraMetadata>({
		name: "sort_key",
		extras: {
			sortKey: true,
		},
	})
	// Day of the click, using epoch time pattern (To facilitate the queries)
	public day: string;

	@CountColumn(["insert", "update"])
	public totalClicks: number;
}

export type ClickByDayRepository = Repository<ClickByDayEntity>;
