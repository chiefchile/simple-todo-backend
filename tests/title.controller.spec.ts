import { assert } from "chai";
import * as titleController from "../src/routes/title.controller";
import { INote, Note } from "../src/models/note";

const NOTE: INote = new Note({
  _id: "1",
  note: "note",
  title: "title",
  user: "alex"
});

describe("title.controller", (): void => {
  describe("handleFindTitles()", (): void => {
    it("should return 0 if there is no err", (): void => {
      let findResult = titleController.handleFindTitles(null, [NOTE]);
      assert(findResult.code === 0);
      assert.isOk(findResult.titles);
    });
    it("should return -5 if there is an err", (): void => {
      let findResult = titleController.handleFindTitles(new Error(), []);
      assert(findResult.code === -5);
    });
  });
});
