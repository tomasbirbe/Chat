import React, { useState } from 'react';
import io from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';

// Components

import Login from './pages/Login';
import Home from './pages/Home';
import RequireAuth from './Auth/requireAuth';
import NotFound from './pages/NotFound';

const App = () => {
  const socket = io('http://localhost:3001');

  const msg = {
    idChat: '61a1d616edf95263767e4bf0',
    from: '619517962e4115cb2f2a4ff2',
    to: '619517c33f71768682809bbd',
    data: 'Hola!',
    timestamp: new Date().getTime(),
  };

  const handleClick = () => {
    socket.emit('message:sendMessage', msg);
  };
  const getChat = {
    idChat: '61a1d616edf95263767e4bf0',
    token: 1,
  };
  const handleClick2 = () => {
    socket.emit('message:getChat', getChat);
  };

  socket.on(`sendChat:${1}`, (chat) => console.log(chat));

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <button onClick={() => handleClick()}>Hola</button>
      <button onClick={() => handleClick2()}>Get chats</button>
    </>
  );
};

export default App;
