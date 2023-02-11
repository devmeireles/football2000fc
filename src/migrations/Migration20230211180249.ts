import { Migration } from "@mikro-orm/migrations";

export class Migration20230211180249 extends Migration {

    async up(): Promise<void> {
        this.addSql("create table \"regions\" (\"id\" varchar(255) not null, \"name\" varchar(255) not null, \"active\" boolean not null default true, \"external_id\" varchar(255) not null, \"created_at\" bigint not null default 1676138528586, \"updated_at\" bigint null, constraint \"regions_pkey\" primary key (\"id\"));");

        this.addSql("create table \"leagues\" (\"id\" varchar(255) not null, \"active\" boolean not null default true, \"type\" varchar(255) not null, \"slug\" varchar(255) not null, \"country\" varchar(255) not null, \"media\" varchar(255) null, \"name\" varchar(255) not null, \"tier\" varchar(255) null, \"external_id\" varchar(255) not null, \"region_id\" varchar(255) not null, \"created_at\" bigint not null default 1676138528593, \"updated_at\" bigint null, constraint \"leagues_pkey\" primary key (\"id\"));");

        this.addSql("alter table \"leagues\" add constraint \"leagues_region_id_foreign\" foreign key (\"region_id\") references \"regions\" (\"id\") on update cascade;");
    }

    async down(): Promise<void> {
        this.addSql("alter table \"leagues\" drop constraint \"leagues_region_id_foreign\";");

        this.addSql("drop table if exists \"regions\" cascade;");

        this.addSql("drop table if exists \"leagues\" cascade;");
    }

}
