"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { assert } = require('chai');
const login_controller_1 = require("./login.controller");
describe('handleLogin()', () => {
    it('should return 0 if there is no err', () => {
        const userFromDb = { username: 'user', password: 'pass' };
        let saveResult = login_controller_1.handleLogin(null, userFromDb, 'user', 'pass');
        assert(saveResult.code === 0);
    });
    it('should return -10 if there is an err', () => {
        let saveResult = login_controller_1.handleLogin(new Error(), null, '', '');
        assert(saveResult.code === -10);
    });
    it('should return -11 if user is not found', () => {
        let saveResult = login_controller_1.handleLogin(null, null, '', '');
        assert(saveResult.code === -11);
    });
    it('should return -12 if password is invalid', () => {
        const userFromDb = { username: 'user', password: 'pass' };
        let saveResult = login_controller_1.handleLogin(null, userFromDb, 'user', '11111');
        assert(saveResult.code === -12);
    });
});
//# sourceMappingURL=login.controller.spec.js.map