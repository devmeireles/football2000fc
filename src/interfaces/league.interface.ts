import { ICountry } from './country.interface';
import { IDefault } from './default.interface';
import { IMedia } from './media.interface';
import { ISeason } from './season.interface';

export type TLeagueType = 'CHAMPIONSHIP' | 'LEAGUE' | 'UNSET' | 'FRIENDLY';

export interface ILeague extends IDefault {
  active: boolean;
  type: TLeagueType;
  slug: string;
  country: ICountry | string;
  media?: IMedia | string;
  name: string;
  seasons?: ISeason[] | Record<string, any>;
  external_id: string;
  region?: string;
  tier?: string;
}