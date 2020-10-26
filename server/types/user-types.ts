interface IUser {
  username: String;
  email: String;
  password: String;
  isAdmin: Boolean;
}

interface IDecodedJWT {
  id: string;
  iat: number;
  exp: number;
}

export { IUser, IDecodedJWT };
