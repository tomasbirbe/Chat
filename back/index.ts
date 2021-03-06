import { createServer, mountServer } from './server';
import connectToDB from './src/db/connect';
import dotenv from 'dotenv';

// Routers

import authRouter from './src/Routes/auth.routes';
import userRouter from './src/Routes/user.routes';

// Socket handlers

import {
  addMessage,
  sendChat,
  updateAll,
} from './src/Handlers/Message.Handler';
import { createChat } from './src/Handlers/Chat.handler';

// Make .env file available on every ts file

dotenv.config();

const { app, httpServer, io } = createServer();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

const onConnection = (socket) => {
  socket.on('chat: newChat', createChat(socket));
  socket.on('message:sendMessage', addMessage(socket));
  socket.on('message:getChat', sendChat(socket));
  socket.on('chats:updateAll', updateAll(socket));
};

io.on('connection', onConnection);

mountServer(httpServer);
