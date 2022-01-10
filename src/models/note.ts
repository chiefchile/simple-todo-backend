import mongoose from "mongoose";

var noteSchema = new mongoose.Schema({
  note: String,
  title: String,
  username: String,
});

export const Note = mongoose.model<INote>("Note", noteSchema);

export interface INote extends mongoose.Document {
  note: string;
  title: string;
  username: string;
  _id: string;
}
