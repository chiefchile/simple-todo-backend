const { assert } = require('chai');
const loginController = require('./login.controller');

describe('handleLogin()', () => {
    it('should return 0 if there is no err', () => {
        const userFromDb = { username: 'user', password: 'pass' };
        let saveResult = loginController.handleLogin(null, userFromDb, 'user', 'pass');
        assert(saveResult.code === 0);
    });
    it('should return -10 if there is an err', () => {
        let saveResult = loginController.handleLogin('err');
        assert(saveResult.code === -10);
    });
    it('should return -11 if user is not found', () => {
        let saveResult = loginController.handleLogin(null, null);
        assert(saveResult.code === -11);
    });
    it('should return -12 if password is invalid', () => {
        const userFromDb = { username: 'user', password: 'pass' };
        let saveResult = loginController.handleLogin(null, userFromDb, 'user', '11111');
        assert(saveResult.code === -12);
    });
});
