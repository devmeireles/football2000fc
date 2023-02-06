import { Kafka, logLevel } from 'kafkajs'
import * as dotenv from 'dotenv'
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);

    const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER!
    const EXAMPLE_TOPIC = 'example-topic'
    const EXAMPLE_CONSUMER = 'example-consumer'

    const kafka = new Kafka({ brokers: [KAFKA_BROKER_ADDRESS], logLevel: logLevel.ERROR })
    const consumer = kafka.consumer({ groupId: EXAMPLE_CONSUMER })

    await consumer.connect()
    await consumer.subscribe({ topic: EXAMPLE_TOPIC })
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log({
                offset: message.offset,
                value: message.value?.toString(),
                key: message.key?.toString(),
            })
        },
    })
});