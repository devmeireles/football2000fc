import { EContinent } from 'src/entities/continent.entity';
import { IDefault } from './default.interface';
import { ILeague } from './league.interface';
import { IMedia } from './media.interface';

export interface ICountry extends IDefault {
  name: string;
  media: IMedia;
  continent?: EContinent;
  iso: string;
  iso2: string;
  longitude: string;
  latitude: string;
  leagues?: ILeague[] | Record<string, any>;
}