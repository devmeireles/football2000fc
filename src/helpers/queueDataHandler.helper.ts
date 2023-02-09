import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { KafkaMessage } from "kafkajs"
import { LeagueEntity } from "../entities";
import { ILeague } from "../interfaces";

export const queueDataHandler = async (message: KafkaMessage, orm: MikroORM<PostgreSqlDriver>) => {
    try {
        const { value, key } = message;
        const data = JSON.parse(value.toString());
        const parsedKey = key.toString();

        switch (parsedKey as unknown as string) {
            case 'get-league':
                const league = data as ILeague

                const leagueExists = await orm.em.findOne(LeagueEntity, {
                    external_id: league.external_id,
                    country: league.country,
                    slug: league.slug
                });

                if (!leagueExists) {
                    league.created_at = new Date().getTime();
                    orm.em.create(LeagueEntity, league);
                    orm.em.flush()
                }

                break;

            default:
                break;
        }
    } catch (error) {
        console.log(error)
    }
}