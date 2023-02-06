import { END_POINTS } from '../../config/consts';
import { ELeagueRegion } from '../../types/ELeagueRegion';
import { TCrawlerEventUrl } from '../../types/TCrawlerEventUrl';
import { TLeagueCrawlerEvent } from '../../types/TLeagueCrawlerEvent';
import { TransfermarktLeague } from '../classes/TransfermarktLeague';
import { ILeague } from '../../interfaces/league.interface';

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