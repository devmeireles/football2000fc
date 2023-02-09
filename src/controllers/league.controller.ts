import { Request, Response } from "express";
import { leagueService } from "../services"

export const listLeagues = async (req: Request, res: Response) => {
    try {
        const data = await leagueService.getLeagues();

        return res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        });
    }
}