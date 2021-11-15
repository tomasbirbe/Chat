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

console.log('hola');

io.on('connection', () => {
  console.log('hola!');
});

httpServer.listen(3001);
