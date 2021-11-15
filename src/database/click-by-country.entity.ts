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
export class ClickByCountryEntity {
	@PrimaryColumn()
	public urlId: string;

	@Column<ColumnExtraMetadata>({
		name: "sort_key",
		extras: {
			sortKey: true,
		},
	})
	public country: string;

	@CountColumn(["insert", "update"])
	public totalClicks: number;
}

export type ClickByCountryRepository = Repository<ClickByCountryEntity>;
