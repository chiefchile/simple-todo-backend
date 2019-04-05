"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const noteController = __importStar(require("./note.controller"));
const note_1 = require("./note");
const NOTE = new note_1.Note({
    _id: "1",
    note: "note",
    title: "title",
    user: "alex"
});
describe("NoteController", () => {
    describe("handleSave()", () => {
        it("should return 0 if there is no err", () => {
            let saveResult = noteController.handleSave(null, NOTE);
            chai_1.assert(saveResult.code === 0);
            chai_1.assert.isOk(saveResult._id);
        });
        it("should return -1 if there is an err", () => {
            let saveResult = noteController.handleSave(new Error(), null);
            chai_1.assert(saveResult.code === -1);
        });
    });
    describe("handleFind()", () => {
        it("should return 0 if there is no err", () => {
            let findResult = noteController.handleFind(null, NOTE);
            chai_1.assert(findResult.code === 0);
            chai_1.assert.isOk(findResult.note);
        });
        it("should return -2 if there is an err", () => {
            let findResult = noteController.handleFind(new Error(), null);
            chai_1.assert(findResult.code === -2);
        });
    });
    describe("handleUpate()", () => {
        it("should return 0 if there is no err", () => {
            let updateResult = noteController.handleUpate(null, { nModified: 1 });
            chai_1.assert(updateResult.code === 0);
        });
        it("should return -3 if there is an err", () => {
            let updateResult = noteController.handleUpate(new Error(), null);
            chai_1.assert(updateResult.code === -3);
        });
        it("should return -6 if nothing is updated", () => {
            let updateResult = noteController.handleUpate(null, { nModified: 0 });
            chai_1.assert(updateResult.code === -6);
        });
    });
    describe("handleDelete()", () => {
        it("should return 0 if there is no err", () => {
            let deleteResult = noteController.handleDelete(null, { n: 1 });
            chai_1.assert(deleteResult.code === 0);
        });
        it("should return -4 if there is an err", () => {
            let deleteResult = noteController.handleDelete(new Error(), null);
            chai_1.assert(deleteResult.code === -4);
        });
        it("should return -7 if nothing is deleted", () => {
            let deleteResult = noteController.handleDelete(null, { n: 0 });
            chai_1.assert(deleteResult.code === -7);
        });
    });
    describe("handleFindTitles()", () => {
        it("should return 0 if there is no err", () => {
            let findResult = noteController.handleFindTitles(null, [NOTE]);
            chai_1.assert(findResult.code === 0);
            chai_1.assert.isOk(findResult.titles);
        });
        it("should return -5 if there is an err", () => {
            let findResult = noteController.handleFindTitles(new Error(), []);
            chai_1.assert(findResult.code === -5);
        });
    });
});
//# sourceMappingURL=note.controller.spec.js.map