import "module-alias/register";
import cors from "cors";
import express, { NextFunction, Request } from "express";
import dotenv from 'dotenv';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { routes } from "./routes/index";
import options from "./mikro-orm.config";

export class App {
    public app: express.Application;
    public orm: MikroORM<PostgreSqlDriver>;

    constructor() {
        dotenv.config();
        this.app = express();
        this.setupDatabase();
        this.setConfig();
        this.setupRoutes();
    }

    private setConfig(): void {
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use((req, __, next: NextFunction) => {
            RequestContext.create(this.orm.em, next);
        });
    }

    private async setupDatabase(): Promise<void> {
        this.orm = await MikroORM.init<PostgreSqlDriver>(options)
    }

    private setupRoutes(): void {
        this.app.use("/league", routes.league);
    }
}

export default new App().app;