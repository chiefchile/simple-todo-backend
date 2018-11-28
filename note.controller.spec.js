var assert = require('assert');
const noteController = require('./note.controller');

describe('handleSave test', () => {
    it('should return 0 if there is no err', () => {
        let saveResult = noteController.handleSave(null, {});
        assert.equal(saveResult.code, 0);
    });
    it('should return -1 if there is an err', () => {
        let saveResult = noteController.handleSave('err');
        assert.equal(saveResult.code, -1);
    });
});

describe('handleFind test', () => {
    it('should return 0 if there is no err', () => {
        let findResult = noteController.handleFind(null);
        assert.equal(findResult.code, 0);
    });
    it('should return -2 if there is an err', () => {
        let findResult = noteController.handleFind('err');
        assert.equal(findResult.code, -2);
    });
});

describe('handleUpate test', () => {
    it('should return 0 if there is no err', () => {
        let updateResult = noteController.handleUpate(null, {nModified: 1});
        assert.equal(updateResult.code, 0);
    });
    it('should return -3 if there is an err', () => {
        let updateResult = noteController.handleUpate('err');
        assert.equal(updateResult.code, -3);
    });
	it('should return -10 if nothing is updated', () => {
        let updateResult = noteController.handleUpate(null, {nModified: 0});
        assert.equal(updateResult.code, -10);
    });
});

describe('handleDelete test', () => {
    it('should return 0 if there is no err', () => {
        let deleteResult = noteController.handleDelete(null, {n: 1});
        assert.equal(deleteResult.code, 0);
    });
    it('should return -4 if there is an err', () => {
        let deleteResult = noteController.handleDelete('err');
        assert.equal(deleteResult.code, -4);
    });
	it('should return -11 if nothing is deleted', () => {
        let deleteResult = noteController.handleDelete(null, {n: 0});
        assert.equal(deleteResult.code, -11);
    });
});