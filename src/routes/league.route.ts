import { Router, Request, Response } from "express";

const leagueRouter = Router();

leagueRouter.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'cool'
    })
})

export default leagueRouter