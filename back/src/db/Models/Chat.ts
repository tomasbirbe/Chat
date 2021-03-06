import { Schema, model, SchemaType } from 'mongoose';

const messageSchema = new Schema(
  {
    from: {
      type: { name: String, lastName: String, email: String, _id: String },
      isRequired: true,
    },
    data: { type: String, isRequired: true },
    timestamp: { type: Number, isRequired: true },
  },
  {
    versionKey: false,
  }
);

const userSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
  },
  { versionKey: false }
);

const chatSchema = new Schema(
  {
    members: { type: [userSchema] },
    messages: { type: [messageSchema], isRequired: true },
  },
  { versionKey: false }
);

const Chat = model('Chat', chatSchema);

export default Chat;
