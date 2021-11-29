import React, { useState } from 'react';
import socket from './Connections/socket';
import { Routes, Route } from 'react-router-dom';

// Components

import Login from './pages/Login';
import Home from './pages/Home';
import RequireAuth from './Auth/requireAuth';
import NotFound from './pages/NotFound';

const App = () => {
  const msg = {
    idChat: '61a1d66e71d7f6c32091f344',
    from: 'tomas.birbe@gmail.com',
    to: 'cateyanet1@gmail.com',
    data: 'Hola!',
    timestamp: new Date().getTime(),
  };

  const handleClick = () => {
    socket.emit('message:sendMessage', msg);
  };
  const getChat = {
    idChat: '61a1d66e71d7f6c32091f344',
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
      <button onClick={() => handleClick()}>Generar mensaje</button>
      <button onClick={() => handleClick2()}>Get chats</button>
    </>
  );
};

export default App;
