"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const ResultConst = __importStar(require("./result"));
const user_1 = require("./user");
exports.login = (req, res) => {
    logger_1.logger.info(`Logging in ${req.body.username}`);
    user_1.User.findOne({ username: req.body.username }, (err, user) => {
        res.send(exports.handleLogin(err, user, req.body.username, req.body.password));
    });
};
exports.handleLogin = (err, userFromDb, username, password) => {
    if (err) {
        logger_1.logger.error(err);
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
//# sourceMappingURL=login.controller.js.map