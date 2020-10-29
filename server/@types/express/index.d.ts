declare namespace Express {
  export interface Request {
    user?: { id: string | undefined };
    body?: { username: string; email: string; password: string };
  }
}
