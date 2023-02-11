import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { KafkaMessage } from "kafkajs";
import { RegionEntity, LeagueEntity } from "@/entities";
import { ILeague } from "@/interfaces";

type TQueueDataHandler = {
    message: KafkaMessage,
    orm: MikroORM<PostgreSqlDriver>,
    argv: string[],
    region?: any,
}

export const queueDataHandler = async (params: TQueueDataHandler) => {
    try {
        const { argv, message, orm } = params;
        const { value, key } = message;
        const data = JSON.parse(value.toString());
        const parsedKey = key.toString();

        switch (parsedKey as unknown as string) {
        case "get-league":
            const league = data as ILeague;
            let regionID: string;

            const regionExists = await orm.em.findOne(RegionEntity, {
                external_id: league.region
            });

            if (!regionExists) {
                const newRegionData = {
                    name: league.region,
                    external_id: league.region,
                };

                const region = orm.em.create(RegionEntity, newRegionData);
                orm.em.flush();

                regionID = region.id;
            } else {
                regionID = regionExists.id;
            }

            const leagueExists = await orm.em.findOne(LeagueEntity, {
                external_id: league.external_id,
                country: league.country,
                slug: league.slug
            });

            if (!leagueExists) {
                league.created_at = new Date().getTime();
                league.region = regionID;
                orm.em.create(LeagueEntity, league);
                orm.em.flush();

                if (argv.includes("--fetch-club")) {
                    // Loads the league table
                }
            }

            break;

        default:
            break;
        }
    } catch (error) {
        console.log(error);
    }
};