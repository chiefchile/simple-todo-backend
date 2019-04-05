import mongoose from "mongoose";

var noteSchema = new mongoose.Schema({
  note: String,
  title: String,
  user: String
});

export const Note = mongoose.model<INote>("Note", noteSchema);

export interface INote extends mongoose.Document {
  note: string;
  title: string;
  user: string;
  _id: string;
}
