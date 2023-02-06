import "module-alias/register";
import * as cors from "cors";
import * as express from "express";
import * as dotenv from 'dotenv';
import { routes } from "./routes/index";

export class App {
    public app: express.Application;

    constructor() {
        dotenv.config();
        this.app = express();
        this.setConfig();
        this.setupRoutes();
    }

    private setConfig(): void {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private setupRoutes(): void {
        this.app.use("/league", routes.league);
    }
}

export default new App().app;