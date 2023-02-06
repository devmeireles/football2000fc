import { getLeaguesFromContinent } from "../functions/getLeaguesFromContinent";
import { Kafka, logLevel } from 'kafkajs'
import * as dotenv from 'dotenv'

dotenv.config();

const EXAMPLE_TOPIC = 'example-topic'
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
            breakPoint: 1,
        };
        const leagues = await getLeaguesFromContinent(event);

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