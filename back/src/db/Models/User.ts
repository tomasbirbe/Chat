import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    versionKey: false,
  }
);

const User = model('User', userSchema);

export default User;
