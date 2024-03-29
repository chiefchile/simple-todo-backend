import { Schema, model, Document } from "mongoose";

const userSchema = new Schema<IUser>({
  username: String,
  password: String,
});

export const User = model<IUser>("User", userSchema);

export interface IUser extends Document {
  username: string;
  password: string;
}
