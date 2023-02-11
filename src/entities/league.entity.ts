import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { ICountry, ILeague, IMedia, ISeason, TLeagueType } from "@/interfaces";
import { RegionEntity } from "./region.entity";

@Entity({
    tableName: 'leagues'
})
export class LeagueEntity implements ILeague {
    @PrimaryKey()
    id: string = v4();

    @Property({
        default: true
    })
    active: boolean;

    @Property()
    type: TLeagueType;

    @Property()
    slug: string;

    @Property()
    country: string | ICountry;

    @Property({
        nullable: true
    })
    media?: string | IMedia;

    @Property()
    name: string;

    @Property()
    tier?: string;

    @Property()
    external_id: string;

    @ManyToOne({
        entity: () => RegionEntity,
        nullable: false,
        referenceColumnName: 'id'
    })
    region?: string;

    @Property({
        default: new Date().getTime(),
        type: "bigint",
    })
    created_at: number;

    @Property({
        nullable: true,
        type: "bigint"
    })
    updated_at: number;

    constructor(data: Record<string, any>) {
        Object.assign(this, data);
    }
}