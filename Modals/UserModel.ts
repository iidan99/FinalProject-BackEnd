import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userId: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  password: { type: String },
  register_date: { type: Date },
  last_login: { type: Date },
  update_date: { type: Date },
});

export const UserModel = model("userModel", UserSchema);
