import { KafkaMessage } from "kafkajs"
import { LeagueEntity } from "../entities";

export const queueDataHandler = async (message: KafkaMessage) => {
    try {
        const { value, key } = message;
        const data = JSON.parse(value.toString());
        const parsedKey = key.toString();

        switch (parsedKey as unknown as string) {
            case 'get-league':
                const league = new LeagueEntity(data);
                league.setLeagueData();
                league.setLeagueTeamsData();
                break;

            default:
                break;
        }
    } catch (error) {
        console.log(error)
    }
}