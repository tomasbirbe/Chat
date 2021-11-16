import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: '*',
  },
});

interface user {
  id: number;
  name: string;
  lastName: string;
}

const user1: user = {
  id: 1,
  name: 'Tomas',
  lastName: 'Birbe',
};

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { msg } = message;
    socket.emit('messageIn', {
      idChat: 1,
      newMsg: {
        user: user1,
        content: msg,
        timestamp: new Date().getTime(),
      },
    });
  });
});

httpServer.listen(3001);
