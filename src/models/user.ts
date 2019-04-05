import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

export const User = mongoose.model("User", userSchema);

export interface IUser {
  username: string;
  password: string;
}
