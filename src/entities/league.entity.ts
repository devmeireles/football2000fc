import { Entity, MikroORM, PrimaryKey, Property } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { v4 } from "uuid";
import { ICountry, ILeague, IMedia, ISeason, TLeagueType } from "../interfaces";
import options from '../mikro-orm.config';

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
    seasons?: ISeason[] | Record<string, any>;

    @Property()
    external_id: string;

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

    // public setLeagueTeamsData() {
    //     console.log('save on db', this.data);
}