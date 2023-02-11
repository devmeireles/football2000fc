import { END_POINTS } from '@/config/consts.config';
import { ELeagueRegion, TCrawlerEventUrl, TLeagueCrawlerEvent } from '@/types';
import { TransfermarktLeague } from '@/crawler/classes/TransfermarktLeague';
import { ILeague } from '@/interfaces'

export const getLeaguesFromContinent = async (
    event: TLeagueCrawlerEvent,
): Promise<ILeague[]> => {
    try {
        const url: TCrawlerEventUrl = {
            base: END_POINTS.TRANSFERMARKT_COMPETITION_URL,
            region: ELeagueRegion[event.region],
            page: event.page,
            breakPoint: event.breakPoint,
        };

        const crawler = new TransfermarktLeague();
        const result = await crawler.getLeaguesData(url, event.region);

        return result;
    } catch (error) {
        console.log(error);
        console.log(error.code);
    }
};