import { IContinent } from './continent.interface';
import { ICountry } from './country.interface';
import { IDefault } from './default.interface';
import { IPlayer } from './player.interface';

export interface ITeam extends IDefault {
  name: string;
  players: IPlayer[];
  continent: IContinent | Record<string, any>;
  country: ICountry | Record<string, any>;
}