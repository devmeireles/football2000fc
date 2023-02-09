import { Migration } from '@mikro-orm/migrations';

export class Migration20230209192104 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "leagues" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "leagues" alter column "created_at" set default 1675970460178;');
    this.addSql('alter table "leagues" alter column "updated_at" type bigint using ("updated_at"::bigint);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "leagues" alter column "created_at" type int4 using ("created_at"::int4);');
    this.addSql('alter table "leagues" alter column "created_at" set default \'1675970252336\';');
    this.addSql('alter table "leagues" alter column "updated_at" type int4 using ("updated_at"::int4);');
  }

}
