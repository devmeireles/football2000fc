import { IDefault } from "./default.interface";
import { ITeam } from "./team.interface";

export interface ISeason extends IDefault {
  year?: number;
  name?: string;
  teams?: ITeam[];
  starts?: number;
  ends?: number;
}