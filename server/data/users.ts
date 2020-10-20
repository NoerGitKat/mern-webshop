import bcrypt from "bcryptjs";
import { IUser } from "../types/user-types";

const mockUsers: Array<IUser> = [
  {
    username: "Noer",
    email: "noer@noer.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    username: "Yasmin",
    email: "yasmin@noer.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    username: "Marion",
    email: "marion@noer.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default mockUsers;
