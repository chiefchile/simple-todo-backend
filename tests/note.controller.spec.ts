import { assert } from "chai";
import * as noteController from "../src/routes/note.controller";
import { INote, Note } from "../src/models/note";

const NOTE: INote = new Note({
  _id: "1",
  note: "note",
  title: "title",
  user: "alex"
});

describe("NoteController", (): void => {
  describe("handleSave()", (): void => {
    it("should return 0 if there is no err", (): void => {
      let saveResult = noteController.handleSave(null, NOTE);
      assert(saveResult.code === 0);
      assert.isOk(saveResult._id);
    });
    it("should return -1 if there is an err", (): void => {
      let saveResult = noteController.handleSave(new Error(), null);
      assert(saveResult.code === -1);
    });
  });

  describe("handleFind()", (): void => {
    it("should return 0 if there is no err", (): void => {
      let findResult = noteController.handleFind(null, NOTE);
      assert(findResult.code === 0);
      assert.isOk(findResult.note);
    });
    it("should return -2 if there is an err", (): void => {
      let findResult = noteController.handleFind(new Error(), null);
      assert(findResult.code === -2);
    });
  });

  describe("handleUpate()", (): void => {
    it("should return 0 if there is no err", (): void => {
      let updateResult = noteController.handleUpate(null, { nModified: 1 });
      assert(updateResult.code === 0);
    });
    it("should return -3 if there is an err", (): void => {
      let updateResult = noteController.handleUpate(new Error(), null);
      assert(updateResult.code === -3);
    });
    it("should return -6 if nothing is updated", (): void => {
      let updateResult = noteController.handleUpate(null, { nModified: 0 });
      assert(updateResult.code === -6);
    });
  });

  describe("handleDelete()", (): void => {
    it("should return 0 if there is no err", (): void => {
      let deleteResult = noteController.handleDelete(null, { n: 1 });
      assert(deleteResult.code === 0);
    });
    it("should return -4 if there is an err", (): void => {
      let deleteResult = noteController.handleDelete(new Error(), null);
      assert(deleteResult.code === -4);
    });
    it("should return -7 if nothing is deleted", (): void => {
      let deleteResult = noteController.handleDelete(null, { n: 0 });
      assert(deleteResult.code === -7);
    });
  });
});
