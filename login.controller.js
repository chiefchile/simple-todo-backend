const User = require('./user');
const logger = require('./logger');
const result = require('./result');

exports.login = (req, res) => {
	logger.info(`Logging in ${req.body.username}`);
    User.findOne({username: req.body.username}, (err, user) => {
        res.send(exports.handleLogin(err, user, req.body.username, req.body.password));
    });
}

exports.handleLogin = (err, userFromDb, username, password) => {
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