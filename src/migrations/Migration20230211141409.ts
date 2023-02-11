import { Migration } from '@mikro-orm/migrations';

export class Migration20230211141409 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "regions" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "regions" alter column "created_at" set default 1676123715464;');

    this.addSql('alter table "leagues" add column "tier" varchar(255) null;');
    this.addSql('alter table "leagues" alter column "created_at" type bigint using ("created_at"::bigint);');
    this.addSql('alter table "leagues" alter column "created_at" set default 1676124817657;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "leagues" alter column "created_at" type int8 using ("created_at"::int8);');
    this.addSql('alter table "leagues" alter column "created_at" set default \'1676124627610\';');
    this.addSql('alter table "leagues" drop column "tier";');

    this.addSql('alter table "regions" alter column "created_at" type int8 using ("created_at"::int8);');
    this.addSql('alter table "regions" alter column "created_at" set default \'1676123715464\';');
  }

}
