import { logger } from "../logger";
import Result, * as ResultConst from "../interfaces/result";
import { Response, Request } from "express";
import { IUser, User } from "../models/user";
import express from "express";
var router = express.Router();

export const handleLogin = (
  err: Error | null,
  userFromDb: IUser | null,
  username: string,
  password: string
): Result => {
  if (err) {
    logger.error(err);
    return ResultConst.LOGIN_ERR;
  }

  if (!userFromDb) {
    return ResultConst.USER_NOT_FOUND_ERR;
  }

  if (userFromDb.password !== password) {
    return ResultConst.INVALID_PASSWORD_ERR;
  }

  return ResultConst.SUCCESS;
};

router.post(
  "/",
  (req: Request, res: Response): void => {
    logger.info(`Logging in ${req.body.username}`);
    User.findOne(
      { username: req.body.username },
      (err: Error, user: IUser): void => {
        res.send(handleLogin(err, user, req.body.username, req.body.password));
      }
    );
  }
);

export default router;
