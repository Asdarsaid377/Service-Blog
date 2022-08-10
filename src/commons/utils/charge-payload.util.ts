import { UsersEntity } from '../entity/user.entity';
import { Role } from '../enum/role.enum';
import {
  PayloadUserAdminInterface,
  PayloadUserAgenInterface,
  PayloadUserPlayerInterface,
} from '../interfaces/payload-user.interface';
import { v4 as uuid } from 'uuid';

export const chargePayload = (
  user: UsersEntity,
):
  | PayloadUserAdminInterface
  | PayloadUserPlayerInterface
  | PayloadUserAgenInterface
  | false => {
  switch (user.role) {
    case Role.Admin:
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        share_percentage: user.share_percentage,
      };
    case Role.MasterAgent:
    case Role.Agent:
      return {
        id: user.id,
        role: user.role,
        username: user.username,
        parent: user.parent,
        displayName: user.displayName,
        share_percentage: user.share_percentage,
      };
    case Role.Player:
      const browserid = uuid();
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        parent: user.parent,
        displayName: user.displayName,
        currency: user.currency,
        browserID: browserid,
      };
    default:
      return false;
  }
};
