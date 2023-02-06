import axios from 'axios';
import * as cheerio from 'cheerio';

export class Crawler {
    /**
     * Do a request and return a parsable cheerio object
     * @param uri the item url to be requested
     * @returns a parsable cheerio object
     */
    async getBody(uri: string): Promise<cheerio.CheerioAPI> {
        const AxiosInstance = axios.create();

        const html = await AxiosInstance.get(uri);
        const $ = cheerio.load(html.data);

        return $;
    }

    /**
     * Gets the detailed stats from a player as parsable html
     *
     * @see A page as example [here](https://www.transfermarkt.com/jonathan-calleri/leistungsdatendetails/spieler/284727/saison//verein/0/liga/0/wettbewerb//pos/0/trainer_id/0/plus/1)
     * @param url the url string
     * @returns a parsable {@link CheerioAPI} object
     */
    async getHTML(url: string): Promise<cheerio.CheerioAPI> {
        const $ = await this.getBody(url);
        return $;
    }
}