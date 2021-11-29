import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, isRequired: true },
    lastName: { type: String, isRequired: true },
    email: { type: String, unique: true },
    password: { type: String, isRequired: true },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  },
  {
    versionKey: false,
  }
);

const User = model('User', userSchema);

export default User;
