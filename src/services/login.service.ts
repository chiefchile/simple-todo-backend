import Error from "../interfaces/error";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Token from "../interfaces/token";

export const login = async (
  username: string,
  password: string
): Promise<Token | Error> => {
  const userFromDb = await User.findOne({
    username: username,
  }).exec();

  if (!userFromDb) {
    return { code: 400, msg: "Invalid username or password" };
  }

  const match = await bcrypt.compare(password, userFromDb.password);
  if (!match) {
    return { code: 400, msg: "Invalid username or password" };
  }

  const secret = process.env.TODO_BACKEND_SECRET || "";
  const token = jwt.sign({ username: username }, secret);
  return { token: token };
};
