import { assert } from "chai";
import * as noteController from "../src/routes/note.controller";
import { INote, Note } from "../src/models/note";

const NOTE: INote = new Note({
  _id: "1",
  note: "note",
  title: "title",
  user: "alex",
});

describe("NoteController", (): void => {});
