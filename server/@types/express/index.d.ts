declare namespace Express {
  export interface Request {
    user?: { id: string | undefined; isAdmin: boolean };
    body?: { username: string; email: string; password: string };
  }
}
