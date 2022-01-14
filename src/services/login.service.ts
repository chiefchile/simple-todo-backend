import Result from "../interfaces/result";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (
  username: string,
  password: string
): Promise<Result> => {
  const userFromDb = await User.findOne({
    username: username,
  }).exec();

  if (!userFromDb) {
    return { code: 404 };
  }

  const match = await bcrypt.compare(password, userFromDb.password);
  if (!match) {
    return { code: 404 };
  }

  const secret = process.env.TODO_BACKEND_SECRET || "";
  const token = jwt.sign({ username: username }, secret);
  return { code: 200, token: token };
};
