import express, { json } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectToDB from './src/db/connect';

const createServer = () => {
  const app = express();
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  // Server configs

  app.use(cors());
  app.use(json());

  return { app, httpServer, io };
};

const mountServer = (httpServer) => {
  connectToDB()
    .then(() => {
      httpServer.listen(process.env.PORT, () => {
        console.log('App is listening on http://localhost:3001');
      });
    })
    .catch(() => {
      console.log("Couldn't connect to database");
    });
};

export { createServer, mountServer };
