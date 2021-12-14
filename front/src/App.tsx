import React, { useState } from 'react';
import socket from './Connections/socket';
import { Routes, Route } from 'react-router-dom';

// Components

import Login from './pages/Login';
import Home from './pages/Home';
import RequireAuth from './Auth/requireAuth';
import NotFound from './pages/NotFound';
import { Container } from '@chakra-ui/layout';

const chatMock = {
  _id: '125',
  participants: [
    {
      name: 'Tomas',
      lastName: 'Birbe',
      email: 'tomas.birbe@gmail.com',
      _id: '1',
    },
    { name: 'Caterina', lastName: 'Banda', email: 'asdfe@gmail.com', _id: '2' },
  ],
  messages: [
    {
      _id: '15',
      from: {
        _id: '1',
        name: 'Tomas',
        lastName: 'Birbe',
        email: 'tomas.birbe@gmail.com',
      },
      timestamp: new Date().getTime() * Math.random() * 10,
      data: 'Hola!',
    },
    {
      _id: '15',
      from: {
        _id: '2',
        name: 'Caterina',
        lastName: 'Banda',
        email: 'asdfe@gmail.com',
      },
      timestamp: new Date().getTime() * Math.random() * 10,
      data: 'Hola, como estas?',
    },
  ],
};

const contactMock = {
  _id: '1',
  idContact: '2',
  alias: 'Caterina',
  email: 'asdfe@gmail.com',
};

const App = () => {
  const [chats, setChats] = useState<chat[]>([
    chatMock,
    chatMock,
    chatMock,
    chatMock,
    chatMock,
    chatMock,
    chatMock,
  ]);
  const [contactList, setContactList] = useState([contactMock]);

  return (
    <Routes>
      <Route
        path="/home"
        element={
          // <RequireAuth>
          <Home
            chatState={[chats, setChats]}
            contactListState={[contactList, setContactList]}
          />
          // </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/chat/:id" element={<ChatPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
