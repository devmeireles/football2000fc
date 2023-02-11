import { Options, FlushMode } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as dotenv from 'dotenv'
import { LeagueEntity } from '@/entities';

dotenv.config();

const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_DB = process.env.POSTGRES_DB

export default {
    type: 'postgresql',
    entities: [
        LeagueEntity
    ],
    dbName: POSTGRES_DB,
    debug: true,
    host: 'localhost',
    port: 5432,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    clientUrl: 'jdbc:postgresql://localhost:5432/postgres',
    allowGlobalContext: true,
    metadataProvider: TsMorphMetadataProvider,
    flushMode: FlushMode.ALWAYS,
} as Options<PostgreSqlDriver>;