import { Kafka, logLevel } from 'kafkajs'
import * as dotenv from 'dotenv'
import { queueDataHandler } from '../helpers/queueDataHandler.helper';

dotenv.config();

(async () => {
    const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER
    const EXAMPLE_TOPIC = 'get-leagues-topic'
    const EXAMPLE_CONSUMER = 'get-leagues-consumer'

    const kafka = new Kafka({ brokers: [KAFKA_BROKER_ADDRESS], logLevel: logLevel.ERROR })
    const consumer = kafka.consumer({ groupId: EXAMPLE_CONSUMER })

    await consumer.connect()
    await consumer.subscribe({ topic: EXAMPLE_TOPIC })
    await consumer.run({
        eachMessage: async ({ message }) => {
            await queueDataHandler(message);
        },
    })
})();