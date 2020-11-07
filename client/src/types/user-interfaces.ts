interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  token: string;
}

interface IUserAction {
  loading: boolean;
  type: string;
  payload: IUser;
  error: string;
}

interface ICredentials {
  username?: string;
  email: string;
  password: string;
}

export type { IUserAction, IUser, ICredentials };
