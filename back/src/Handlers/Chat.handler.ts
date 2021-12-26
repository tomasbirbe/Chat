import Chat from '../db/Models/Chat';
import jwt from 'jsonwebtoken';

const createChat = (socket) => async (payload) => {
  const { members, messages, token } = payload;
  console.log(jwt.decode(token));
  Chat.create({
    members,
    messages,
  });
};

export { createChat };
