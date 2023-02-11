import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity({
    tableName: 'regions'
})
export class RegionEntity {
    @PrimaryKey()
    id: string = v4();

    @Property()
    name: string;

    @Property({
        default: true
    })
    active: boolean;

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
}