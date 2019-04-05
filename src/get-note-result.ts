import Result from "./result";
import { INote } from "./note";

export default interface GetNoteResult extends Result {
  note?: INote | null;
}
