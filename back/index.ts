import { createServer, mountServer } from './server';
import connectToDB from './src/db/connect';
import dotenv from 'dotenv';

// Routers

import authRouter from './src/Routes/auth.routes';
import userRouter from './src/Routes/user.routes';

// Socket handlers

import { sendChat, updateChat } from './src/Handlers/Message.Handler';

// Make .env file available on every ts file
dotenv.config();

const { app, httpServer, io } = createServer();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);

const onConnection = (socket) => {
  socket.on('message:sendMessage', updateChat(socket));
  socket.on('message:getChat', sendChat(socket));
};

io.on('connection', onConnection);

mountServer(httpServer);
