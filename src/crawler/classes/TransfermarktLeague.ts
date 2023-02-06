import { getLeagueExternalIdFromImg, imageResize } from '../../helpers/dataHandler';
import { slugfy } from '../../helpers/slugfy';
import { ELeagueRegion } from '../../types/ELeagueRegion';
import { ILeague } from '../../interfaces/league.interface';
import { Transfermarkt } from './Transfermarkt';
import { TCrawlerEventUrl } from '../../types/TCrawlerEventUrl';

/**
 * The Transfermarkt class to handle with Leagues
 */
export class TransfermarktLeague extends Transfermarkt {
  /**
   * Loops through leagues pages table
   *
   * @see A page as example [here](https://www.transfermarkt.com/wettbewerbe/amerika?ajax=yw1&page=1)
   * @param url URL page as string
   * @returns a {@link ILeague} object
   */
  async getLeaguesData(
    url: TCrawlerEventUrl,
    region: ELeagueRegion,
  ): Promise<ILeague[]> {
    console.log(region);

    const initialURL = `${url.base}/${url.region}?ajax=yw1&page=${url.page}`;
    const $ = await this.getHTML(initialURL);

    const lastPage =
      url.breakPoint ||
      $('.tm-pagination__list-item--icon-last-page')
        .children()
        .attr('href')
        .split('=')
        .slice(-1)[0];

    const data: ILeague[] = [];

    for (let index = 1; index <= Number(lastPage); index++) {
      const dynamicURL = `${url.base}/${url.region}?ajax=yw1&page=${index}`;
      const $ = await this.getHTML(dynamicURL);

      const rows = $(
        '.responsive-table > .grid-view > table.items > tbody > tr',
      ).filter('.odd, .even');

      if (rows.length > 0) {
        rows.map((i, item) => {
          const imageEl = $(item)
            .find('td.hauptlink')
            .eq(0)
            .find('table > tbody > tr > td:nth-child(1) > a > img');
          const imageURL = $(imageEl).attr('src');
          const league = $(imageEl).attr('title');
          const country = $(item)
            .find('td.zentriert')
            .eq(0)
            .find('img')
            .attr('title');
          const external_id = getLeagueExternalIdFromImg(imageURL);

          data.push({
            name: league,
            slug: slugfy(league),
            media: imageResize(imageURL, 'tiny', 'normal', true),
            country,
            created_at: new Date().getTime(),
            updated_at: new Date().getTime(),
            active: false,
            type: 'UNSET',
            external_id,
          });
        });
      }
    }

    return data;
  }
}