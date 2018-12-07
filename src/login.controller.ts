const User = require('./user');
const logger = require('./logger');
const result = require('./result');
import { Response, Request } from "express";
import { IUser } from './user';

export const login = (req: Request, res: Response) => {
	logger.info(`Logging in ${req.body.username}`);
    User.findOne({username: req.body.username}, (err: Error, user: IUser) => {
        res.send(exports.handleLogin(err, user, req.body.username, req.body.password));
    });
}

export const handleLogin = (err: Error | null, userFromDb: IUser | null, username: string, password: string) => {
    if (err) {
		logger.error(err);
		return result.LOGIN_ERR;
    }
    
    if (!userFromDb) {
        return result.USER_NOT_FOUND_ERR;
    }

    if (userFromDb.password !== password) {
        return result.INVALID_PASSWORD_ERR;
    }

	return result.SUCCESS;
}