const { assert } = require('chai');  
const noteController = require('./note.controller');

describe('handleSave()', () => {
    it('should return 0 if there is no err', () => {
        let saveResult = noteController.handleSave(null, {_id: 1});
        assert(saveResult.code === 0);
		assert.isOk(saveResult._id);
    });
    it('should return -1 if there is an err', () => {
        let saveResult = noteController.handleSave('err');
        assert(saveResult.code === -1);
    });
});

describe('handleFind()', () => {
    it('should return 0 if there is no err', () => {
        let findResult = noteController.handleFind(null, {note: "this is a note"});
        assert(findResult.code === 0);
		assert.isOk(findResult.note);
    });
    it('should return -2 if there is an err', () => {
        let findResult = noteController.handleFind('err');
        assert(findResult.code === -2);
    });
});

describe('handleUpate()', () => {
    it('should return 0 if there is no err', () => {
        let updateResult = noteController.handleUpate(null, {nModified: 1});
        assert(updateResult.code === 0);
    });
    it('should return -3 if there is an err', () => {
        let updateResult = noteController.handleUpate('err');
        assert(updateResult.code === -3);
    });
	it('should return -6 if nothing is updated', () => {
        let updateResult = noteController.handleUpate(null, {nModified: 0});
        assert(updateResult.code === -6);
    });
});

describe('handleDelete()', () => {
    it('should return 0 if there is no err', () => {
        let deleteResult = noteController.handleDelete(null, {n: 1});
        assert(deleteResult.code === 0);
    });
    it('should return -4 if there is an err', () => {
        let deleteResult = noteController.handleDelete('err');
        assert(deleteResult.code === -4);
    });
	it('should return -7 if nothing is deleted', () => {
        let deleteResult = noteController.handleDelete(null, {n: 0});
        assert(deleteResult.code === -7);
    });
});

describe('handleFindTitles()', () => {
    it('should return 0 if there is no err', () => {
        let findResult = noteController.handleFindTitles(null, [{title: "Note Title"}]);
        assert(findResult.code === 0);
		assert.isOk(findResult.titles);
    });
    it('should return -5 if there is an err', () => {
        let findResult = noteController.handleFindTitles('err');
        assert(findResult.code === -5);
    });
});