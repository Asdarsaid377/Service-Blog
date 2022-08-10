import { currency } from '../enum/currency.enum';

export interface PayloadBaseUserInterface {
  id: number;
  username: string;
  role: string;
}

export interface PayloadUserAdminInterface extends PayloadBaseUserInterface {
  share_percentage: number;
}
export interface PayloadUserAgenInterface extends PayloadBaseUserInterface {
  parent: number;
  displayName: string;
  share_percentage: number;
}
export interface PayloadUserPlayerInterface extends PayloadBaseUserInterface {
  browserID: string;
  currency: currency | string;
  displayName: string;
  parent: number;
}
