import { CheerioAPI } from 'cheerio';
import { IDefault, IDefaultPlayer, ISeason, PlayerStats } from '@/interfaces';
import {
  formatDataHeaderKey,
  formatDataHeaderValue,
  formatMinutes,
  formatPPG,
  formatScores,
  formatSeasonYear,
} from '@/helpers';
import { Crawler } from './Crawler';

// export type GoalsStats = {
//   season: number;
//   competition: Competition;
//   matchDay: number | string;
//   data: number; // timestamp;
//   venue: string;
//   club: Club;
//   opponent: Club;
//   result: string;
//   position: string;
//   minute: number;
//   atScore: string;
//   goalType: string;
//   goalAssist: GoalAssist;
// };

// export type TransferHistory = {
//   season: string;
//   date: string;
//   left: Club;
//   joined: Club;
//   marketValue: string;
//   fee: string;
// };

export type Player = IDefaultPlayer & {
  name: string;
  number?: number;
  playerStats?: PlayerStats[];
  //   goalsDetailed?: GoalsStats[];
  //   transferHistory?: TransferHistory[];
};

export class Transfermarkt extends Crawler {
  /**
   *
   * @param $
   * @returns
   */
  async getPlayerHeadData($: CheerioAPI): Promise<IDefaultPlayer> {
    const tempObj = {};

    const dataHeader = $(
      '.dataHeader > .dataContent > .dataBottom > .dataDaten > p',
    );

    dataHeader.map((i, el) => {
      const spanItem = $(el).find('span');
      const headerKey = formatDataHeaderKey($(spanItem[0]).text());
      tempObj[headerKey] = formatDataHeaderValue(
        $(spanItem[1]).text(),
        headerKey,
      );
    });

    return tempObj as IDefaultPlayer;
  }

  /**
   *
   * @param $
   * @returns
   */
  async getPlayerStats($: CheerioAPI): Promise<PlayerStats[]> {
    const playerStats = [];

    const statsTable = $(
      '.responsive-table > .grid-view > table.items > tbody > tr',
    );

    statsTable.map((i, el) => {
      const tdElement = $(el).find('td');

      const competition = {
        id: $(tdElement[2]).find('a').attr('href').split('/')[4],
        name:
          $(tdElement[1]).find('img').attr('alt') ||
          $(tdElement[1]).find('img').attr('title') ||
          $(tdElement[2]).find('a').text(),
      };

      const club = {
        id: Number($(tdElement[3]).find('a').attr('href').split('/')[4]),
        name: $(tdElement[3]).find('a > img').attr('alt'),
      };

      const season = {
        year: formatSeasonYear($(tdElement[0]).text()),
        name: $(tdElement[0]).text(),
      };

      const playerState: PlayerStats = {
        season,
        competition,
        club,
        squad: formatScores($(tdElement[4]).text()),
        apps: formatScores($(tdElement[5]).text()),
        ppg: formatPPG($(tdElement[6]).text()),
        goals: formatScores($(tdElement[7]).text()),
        assists: formatScores($(tdElement[8]).text()),
        ownGoals: formatScores($(tdElement[9]).text()),
        substitutionsOn: formatScores($(tdElement[10]).text()),
        substitutionsOff: formatScores($(tdElement[11]).text()),
        yellowCard: formatScores($(tdElement[12]).text()),
        secondYellowCard: formatScores($(tdElement[13]).text()),
        redCard: formatScores($(tdElement[14]).text()),
        penaltyGoal: formatScores($(tdElement[15]).text()),
        minutesPerGoal: formatMinutes($(tdElement[16]).text()),
        minutesPlayed: formatMinutes($(tdElement[17]).text()),
      };

      playerStats.push(playerState);
    });

    return playerStats;
  }

  /**
   * Gets the detailed stats from a player as parsable html
   *
   * @see A page as example [here](https://www.transfermarkt.com/jonathan-calleri/leistungsdatendetails/spieler/284727/saison//verein/0/liga/0/wettbewerb//pos/0/trainer_id/0/plus/1)
   * @param playerId the player id
   * @returns a parsable {@link CheerioAPI} object
   */
  async getPlayerHTML(playerId: number): Promise<CheerioAPI> {
    const link = `https://www.transfermarkt.com/jonathan-calleri/leistungsdatendetails/spieler/${playerId}/saison//verein/0/liga/0/wettbewerb//pos/0/trainer_id/0/plus/1`;
    const $ = await this.getBody(link);
    return $;
  }

  /**
   * Generates a {@link Player} object
   * @param playerId the player id
   * @returns a {@link Player} object
   */
  async getPlayerData(playerId: number): Promise<Player> {
    try {
      const $ = await this.getPlayerHTML(playerId);

      const name: string = $('.dataName > h1').text();

      const number = Number($('.dataName > .dataRN').text().replace('#', ''));

      const playerStats = await this.getPlayerStats($);

      const { birth, city_birth, country_birth, height, position } =
        await this.getPlayerHeadData($);

      return {
        name,
        number,
        birth,
        country_birth,
        city_birth,
        height,
        position,
        citezenship: [''],
        playerStats,
      };
    } catch (error) {
      console.log(error);
    }
  }
}