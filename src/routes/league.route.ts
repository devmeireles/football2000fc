import { Router, Request, Response } from "express";
import { leagueController } from "@/controllers";

const leagueRouter = Router();
leagueRouter.get('/', (req: Request, res: Response) => leagueController.listLeagues(req, res))

export default leagueRouter