import { assert } from "chai";
import * as titleController from "../src/routes/title.controller";
import { INote, Note } from "../src/models/note";

const NOTE: INote = new Note({
  _id: "1",
  note: "note",
  title: "title",
  user: "alex",
});

describe("title.controller", (): void => {});
