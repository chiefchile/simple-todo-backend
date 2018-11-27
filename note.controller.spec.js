var assert = require('assert');
const noteController = require('./note.controller');

describe('handleSave test', () => {
    it('should return 0 if there is no err', () => {
        let saveResult = noteController.handleSave(null);
        assert.equal(saveResult.code, 0);
    });
    it('should return -1 if there is an err', () => {
        let saveResult = noteController.handleSave('err');
        assert.equal(saveResult.code, -1);
    });
});