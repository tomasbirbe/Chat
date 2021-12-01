import Chat from '../db/Models/Chat';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../db/Models/User';

interface user {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  chats: string[];
}

interface message {
  idChat: string;
  from: user;
  to?: string;
  data: string;
  timestamp: number;
}

const addMessage = (socket) => async (payload) => {
  const { idChat, from, to, data, timestamp } = payload;
  const { id }: any = jwt.decode(from);
  const user = await User.findById(id).populate('chats');

  let chat;

  try {
    chat = await Chat.findById(idChat);
  } catch {
    chat = await Chat.create({
      messages: [],
    });
    const user2 = await User.findOne({ email: to });
    user.chats.push(chat._id);
    user2.chats.push(chat._id);
    user.save();
    user2.save();
  }
  chat.messages.push({
    from: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
    },
    data,
    timestamp,
  });
  await chat.save();
  console.log(from);
  socket.emit(`updateChats:${user.email}`, user.chats);
  socket.emit(`updateChats:${to}`, user.chats);
};

const sendChat = (socket) => (payload) => {
  const { idChat, token } = payload;
  Chat.findById(idChat).then((chat) => {
    socket.emit(`updateChats:${token}`, chat);
  });
};

const updateAll = (socket) => async (payload) => {
  const { token } = payload;
  const { id }: any = jwt.decode(token);
  const user = await User.findById(id).populate('chats');
  socket.emit(`updateChats:${user.email}`, user.chats);
};

export { addMessage, sendChat, updateAll };
