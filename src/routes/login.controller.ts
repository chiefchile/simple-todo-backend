import { logger } from "../logger";
import Result, * as ResultConst from "../interfaces/result";
import { Response, Request } from "express";
import { IUser, User } from "../models/user";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

export const handleLogin = async (
  userFromDb: IUser | null,
  username: string,
  password: string
): Promise<Result> => {
  if (!userFromDb) {
    return ResultConst.USER_NOT_FOUND_ERR;
  }

  const match = await bcrypt.compare(password, userFromDb.password);
  if (!match) {
    return ResultConst.INVALID_PASSWORD_ERR;
  }

  const secret = process.env.TODO_BACKEND_SECRET || "";
  const token = jwt.sign({ username: username }, secret);
  return { ...ResultConst.SUCCESS, token: token };
};

export const handleLogin2 = async (username: string, password: string) => {
  const userFromDb = await User.findOne({
    username: username,
  }).exec();

  if (!userFromDb) {
    return ResultConst.USER_NOT_FOUND_ERR;
  }

  const match = await bcrypt.compare(password, userFromDb.password);
  if (!match) {
    return ResultConst.INVALID_PASSWORD_ERR;
  }

  const secret = process.env.TODO_BACKEND_SECRET || "";
  const token = jwt.sign({ username: username }, secret);
  return { ...ResultConst.SUCCESS, token: token };
};

router.post(
  "/",
  async (req: Request, res: Response, next: any): Promise<void> => {
    logger.info(`Logging in ${req.body.username}`);
    try {
      // const userFromDb = await User.findOne({
      //   username: req.body.username,
      // }).exec();
      // const result = await handleLogin(
      //   userFromDb,
      //   req.body.username,
      //   req.body.password
      // );
      // if (result.code !== 0) {
      //   res.statusCode = 500;
      // }
      // res.send(result);
      const result = await handleLogin2(req.body.username, req.body.password);
      if (result.code < 0) {
        res.statusCode = 500;
        res.json(result);
        return;
      }

      res.json(result);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
