import { Kafka, logLevel } from 'kafkajs'
import * as dotenv from 'dotenv'
import { getLeaguesFromContinent } from "@/crawler/functions/getLeaguesFromContinent";
import { ILeague } from '@/interfaces'
import { ELeagueRegion } from "@/types";

dotenv.config();

const EXAMPLE_TOPIC = 'get-leagues-topic'
const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER!

console.log(KAFKA_BROKER_ADDRESS);

const kafka = new Kafka({ brokers: [KAFKA_BROKER_ADDRESS], logLevel: logLevel.ERROR })
const producer = kafka.producer()

type TLeagueCrawlerEvent = {
    region: any;
    page: any;
    breakPoint?: number;
};

(async () => {
    try {
        await producer.connect()

        const event: TLeagueCrawlerEvent = {
            region: 3,
            page: 1,
            breakPoint: 2,
        };
        const leagues = await getLeaguesFromContinent(event);

        // const leagues: ILeague[] = [
        //     {
        //         name: "Premier Liga",
        //         slug: "premier-liga",
        //         media: "https://tmssl.akamaized.net/images/logo/normal/ukr1.png",
        //         country: "Ukraine",
        //         created_at: 1675721245613,
        //         updated_at: 1675721245613,
        //         active: false,
        //         type: "UNSET",
        //         external_id: "ukr1",
        //         region: ELeagueRegion[event.region]
        //     }
        // ]

        leagues.forEach(async (item, index) => {
            await producer.send({
                topic: EXAMPLE_TOPIC,
                messages: [{ key: 'get-league', value: JSON.stringify(item) }],
            })

            if (index === leagues.length - 1) {
                await producer.disconnect()
                process.exit(0)
            }
        })
    } catch (error) {
        console.log(error)
    }
})();