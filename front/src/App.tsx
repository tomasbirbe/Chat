import React, { useState } from 'react';
import io from 'socket.io-client';

interface user {
  id: number;
  name: string;
  lastName: string;
}

interface message {
  user: user;
  content: string;
  timestamp: number;
}

interface chat {
  users: user[];
  id: number;
  messages: message[];
}

const user1: user = {
  id: 1,
  name: 'Tomas',
  lastName: 'Birbe',
};

const user2: user = {
  id: 1,
  name: 'Caterina',
  lastName: 'Banda',
};

const chat1: chat = {
  users: [user1, user2],
  id: 1,
  messages: [
    { user: user1, content: 'Hola!', timestamp: new Date().getTime() },
    { user: user2, content: 'Hola!', timestamp: new Date().getTime() },
    { user: user1, content: 'Como andas?', timestamp: new Date().getTime() },
    {
      user: user2,
      content: 'Todo bien y vos?',
      timestamp: new Date().getTime(),
    },
  ],
};

const chats: chat[] = [chat1];

const App = () => {
  const [counter, setCounter] = useState(0);

  const socket = io('http://localhost:3001');
  socket.connect();

  socket.on('messageIn', (payload) => {
    const { idChat, newMsg } = payload;
    const chatFinded = chats.find((chat) => chat.id === payload.idChat);
    console.log(newMsg);
    chatFinded?.messages.push(newMsg);
  });

  const sendMessage = (e: any) => {
    e.preventDefault();
    console.log({ data: e.target });
    socket.emit('message', { idChat: 1, from: 1, msg: e.target[0].value });
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {chat1.messages.map((message) => (
          <p key={Math.random()}>
            {message.user.name} - {new Date(message.timestamp).toLocaleString()}{' '}
            - {message.content}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <label>
          Tomas
          <input type="text" />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <form onSubmit={sendMessage}>
        <label>
          Caterina
          <input type="text" />
        </label>
        <button type="submit">Enviar</button>
      </form>
      <button onClick={() => setCounter(counter + 1)}>Re-render</button>
    </div>
  );
};

export default App;
