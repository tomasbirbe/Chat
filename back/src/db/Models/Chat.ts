import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    from: { type: String, isRequired: true },
    to: { type: String, isRequired: true },
    data: { type: String, isRequired: true },
    timestamp: { type: Number, isRequired: true },
  },
  {
    versionKey: false,
  }
);

const chatSchema = new Schema(
  {
    messages: { type: [messageSchema], isRequired: true },
  },
  {
    versionKey: false,
  }
);

const Chat = model('Chat', chatSchema);

export default Chat;
