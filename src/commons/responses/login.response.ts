import { UsersEntity } from '../entity/user.entity';

export const loginDashboardResponse = (user: UsersEntity, token: string) => {
  return {
    status: 'success',
    token,
    role: user.role,
  };
};
