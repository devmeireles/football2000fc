# Football2000FC - Data Crawler & API

Football2000FC was born from a long passion for football in sync to learn about new technologies and accompanying the ambition to build a data crawler using a modern and powerful stack based on TypeScript + Docker.

- [Stack](#stack)
    - [Node Packages](#node-packages)
    - [Docker Images](#docker-images)
- [Install](#install)
- [Execute](#execute)
- [API](#API)
    - [League](#League)

<br />

## Stack

### Node Packages

[Mikro-orm](https://www.npmjs.com/package/mikro-orm): TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns. Supports MongoDB, MySQL, MariaDB, PostgreSQL and SQLite databases.

[AWS-SDK](https://github.com/aws/aws-sdk-js): The AWS SDK for JavaScript v3 API Reference Guide provides a JavaScript API for AWS services

[Axios](https://www.npmjs.com/package/axios): Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.

[Cheerio](https://www.npmjs.com/package/cheerio): Cheerio implements a subset of core jQuery. Cheerio removes all the DOM inconsistencies and browser cruft from the jQuery library, revealing its truly gorgeous API.

[Cors](https://www.npmjs.com/package/cors): CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

[Dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

[Express](https://www.npmjs.com/package/express): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

[Kafkajs](https://www.npmjs.com/package/kafkajs): KafkaJS is a modern Apache Kafka client for Node.js. It is compatible with Kafka 0.10+ and offers native support for 0.11 features.

[Module-alias](https://www.npmjs.com/package/module-alias): Create aliases of directories and register custom module paths in NodeJS like a boss!

[TS-Node](https://www.npmjs.com/package/ts-node): It JIT transforms TypeScript into JavaScript, enabling you to directly execute TypeScript on Node.js without precompiling. This is accomplished by hooking node's module loading APIs, enabling it to be used seamlessly alongside other Node.js tools and libraries.

[UUID](https://www.npmjs.com/package/uuid): An Universally Unique Identifier (UUID) is a label used to uniquely identify a resource among all other resources of that type. Computer systems generate UUIDs locally using very large random numbers

<br />

### Docker Images

[vectorized/redpanda](https://hub.docker.com/r/vectorized/redpanda): Redpanda is a streaming platform for mission critical workloads. Kafka® compatible, No Zookeeper®, no JVM, and no code changes required.

[vectorized/console](https://hub.docker.com/r/vectorized/console): Redpanda Console is a web application that helps you manage and debug your Kafka/Redpanda workloads effortlessly. 

[postgres:13.3](https://hub.docker.com/_/postgres): PostgreSQL, often simply "Postgres", is an object-relational database management system (ORDBMS) with an emphasis on extensibility and standards-compliance. 

[dpage/pgadmin4](https://hub.docker.com/r/dpage/pgadmin4): pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source database in the world.

[adobe/s3mock](https://hub.docker.com/r/adobe/s3mock): S3Mock is a lightweight server that implements parts of the Amazon S3 API. It has been created to support hermetic testing and reduces the infrastructure dependencies while testing.

<br /><br />

# Install

Installing the packages dependencies:

```
npm i
```

<br />

Setting the local environment variables:

```
cp .env.example .env
```

<br />


Setting the .env file:

```
KAFKA_BROKER=localhost:9092
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=football2000
```

The variables values might changes according to your environment variables on docker-compose.yml file.


<br />

Building and starting the Docker containers:

```
docker-compose up --build -d
```

<br />

Database migations:

```
npx mikro-orm migration:create && npx mikro-orm migration:up 
```

<br />

Executing the API:

```
npm run start:dev 
```

<br /><br />

# Execute

Executers commands are divided by section as `producers` which is responsible for scrap data and create message topics and `consumers` are responsible for reading these topics and manipulate them on database.  
To place the first data collections on database you must always make sure to first of all have the `consumer` running then executes the `producer`.

<br />

### Producers

`producer:getleagues`: will scrap basic data from leagues and fill the `get-leagues` topic:

```
npx run consumer:getleagues
```

<br />

### Consumers

`consumer:getleagues`: will consume the get-leagues topic and save each basic data for leagues 

```
npx run consumer:getleagues
```


`consumer:getleagueswithClub`: will consume the get-leagues topic as did before but adding basic data about teams per league:

```
npx run consumer:getleagueswithClub
```

<br /><br />

# API
### League


#### Request

`GET /league`

    curl -i http://localhost:3333/league \
    -H 'Accept: application/json'

#### Response

```
{
    "success": true,
    "data": [
        {
            "id": "110497a9-8820-4bad-94b6-b982d44a1cbb",
            "active": false,
            "type": "UNSET",
            "slug": "allsvenskan",
            "country": "Sweden",
            "media": "leagues/2e8a62d5-be2c-484b-86c4-3efa8d69f10f.png",
            "name": "Allsvenskan",
            "tier": null,
            "external_id": "se1",
            "region": "56ee6898-b355-4bd4-9d09-0a50e11f1442",
            "created_at": "1676138633015",
            "updated_at": "1676138630855"
        }
    ]
}
```