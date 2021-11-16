import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  id: Number,
  name: String,
  lastName: String,
  email: String,
});

const User = model('User', userSchema);

export default User;
