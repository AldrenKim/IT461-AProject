import { UserType } from '../enums';

type User = {
  accessToken?: string;
  type: UserType;
  username: string;
};

export default User;
