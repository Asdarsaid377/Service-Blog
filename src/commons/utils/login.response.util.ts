import { UsersEntity } from '../entity/user.entity';

export const loginDashboardResponseUtil = (
  user: UsersEntity,
  token: string,
) => {
  return {
    status: 'success',
    token,
    role: user.role,
  };
};
