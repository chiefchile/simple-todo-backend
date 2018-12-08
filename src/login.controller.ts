const logger = require('./logger');
import Result, * as ResultConst from './result';
import { Response, Request } from "express";
import { IUser, User } from './user';

export const login = (req: Request, res: Response): void => {
	logger.info(`Logging in ${req.body.username}`);
    User.findOne({username: req.body.username}, (err: Error, user: IUser) => {
        res.send(exports.handleLogin(err, user, req.body.username, req.body.password));
    });
}

export const handleLogin = (err: Error | null, userFromDb: IUser | null, username: string, password: string): Result => {
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
}