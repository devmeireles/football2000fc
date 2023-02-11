import { QueryOrder, RequestContext } from "@mikro-orm/core";
import { LeagueEntity } from "@/entities";


export const getLeagues = async () => {
    const entityManager = RequestContext.getEntityManager();
    return await entityManager.find(
        LeagueEntity,
        {
            // active: true
        },
        {
            orderBy: {
                name: QueryOrder.ASC
            }
        }
    );
};