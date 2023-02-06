import { IDefault } from './default.interface';

export interface IMedia extends IDefault {
  path: string;
  active: boolean;
}