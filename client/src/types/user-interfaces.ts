interface IUser {
  username: String;
  email: String;
  password: String;
  isAdmin: Boolean;
  token: string;
}

interface IUserAction {
  loading: Boolean;
  type: string;
  payload: IUser;
  error: string;
}

interface ICredentials {
  username: string;
  password: string;
  email: string;
}

export type { IUserAction, IUser, ICredentials };
