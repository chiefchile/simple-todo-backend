import Result, {
  INVALID_PASSWORD_ERR,
  SUCCESS,
  USER_NOT_FOUND_ERR,
} from "../interfaces/result";
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
    return USER_NOT_FOUND_ERR;
  }

  const match = await bcrypt.compare(password, userFromDb.password);
  if (!match) {
    return INVALID_PASSWORD_ERR;
  }

  const secret = process.env.TODO_BACKEND_SECRET || "";
  const token = jwt.sign({ username: username }, secret);
  return { ...SUCCESS, token: token };
};
