import React, { useState } from 'react';
import socket from './Connections/socket';
import { Routes, Route } from 'react-router-dom';

// Components

import Login from './pages/Login';
import Home from './pages/Home';
import RequireAuth from './Auth/requireAuth';
import NotFound from './pages/NotFound';
import { Container } from '@chakra-ui/layout';
import ChatPage from './pages/ChatPage';
import { chat, contact } from './Types/types';

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
        _id: '1',
        name: 'Tomas',
        lastName: 'Birbe',
        email: 'tomas.birbe@gmail.com',
      },
      timestamp: new Date().getTime() * Math.random() * 10,
      data: 'asdfasdf!',
    },
    {
      _id: '15',
      from: {
        _id: '1',
        name: 'Tomas',
        lastName: 'Birbe',
        email: 'tomas.birbe@gmail.com',
      },
      timestamp: new Date().getTime() * Math.random() * 10,
      data: 'Como estas?',
    },
    {
      _id: '15',
      from: {
        _id: '3',
        name: 'Caterina',
        lastName: 'Banda',
        email: 'asdfe@gmail.com',
      },
      timestamp: new Date().getTime() * Math.random() * 10,
      data: 'Bien, y vos?',
    },
    {
      _id: '15',
      from: {
        _id: '3',
        name: 'Caterina',
        lastName: 'Banda',
        email: 'asdfe@gmail.com',
      },
      timestamp: new Date().getTime() * Math.random() * 10,
      data: 'Bien, y vos?',
    },
    {
      _id: '15',
      from: {
        _id: '1',
        name: 'Tomas',
        lastName: 'Birbe',
        email: 'tomas.birbe@gmail.com',
      },
      timestamp: new Date().getTime() * Math.random() * 10,
      data: 'asdfasdf!',
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
    chatMock,
    chatMock,
    chatMock,
    chatMock,
  ]);
  const [contactList, setContactList] = useState([contactMock]);
  const [contact, setContact] = useState<contact | undefined>(undefined);
  const [chatSelected, setChatSelected] = useState<chat | null>(null);

  return (
    <Routes>
      <Route
        path="/home"
        element={
          // <RequireAuth>
          <Home
            contactListState={{ contactList, setContactList }}
            chatState={{ chats }}
            chatSelectedState={{ setChatSelected }}
            contactState={{ setContact }}
          />
          // </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={
          <ChatPage
            chatState={{ chatSelected, setChatSelected }}
            contactState={{ contact }}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
