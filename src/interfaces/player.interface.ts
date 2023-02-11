import { IDefault } from "./default.interface";

export interface IPlayer extends IDefault {
    name: string;
    position: string;
    birth_date: Date;
}