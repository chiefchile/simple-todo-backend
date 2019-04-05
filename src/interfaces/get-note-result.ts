import Result from "./result";
import { INote } from "../models/note";

export default interface GetNoteResult extends Result {
  note?: INote | null;
}
