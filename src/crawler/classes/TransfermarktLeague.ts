import { getLeagueExternalIdFromImg, imageResize, slugfy } from '@/helpers';
import { ELeagueRegion, TCrawlerEventUrl } from '@/types';
import { ILeague } from '@/interfaces';
import { Transfermarkt } from './Transfermarkt';
import { imageToS3 } from '@/helpers/fileDownloader.helper';

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
        rows.map(async (i, item) => {
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

          const formatedImg = imageResize(imageURL, 'tiny', 'normal', true);
          const s3Image = await imageToS3('leagues', formatedImg);

          data.push({
            name: league,
            slug: slugfy(league),
            media: s3Image,
            country,
            created_at: new Date().getTime(),
            updated_at: new Date().getTime(),
            active: false,
            type: 'UNSET',
            external_id,
            region: ELeagueRegion[region],
          });
        });
      }
    }

    return data;
  }
}