import { IDefault } from "./default.interface";
import { ICountry } from "./country.interface";

export interface IContinent extends IDefault {
  name: string;
  countries?: ICountry[] | Record<string, any>;
}