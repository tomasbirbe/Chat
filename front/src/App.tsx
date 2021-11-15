import React from 'react';

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

const App = () => {
  return (
    <div>
      <h1>Chat</h1>
      <div>
        {chat1.messages.map((message) => (
          <p key={message.timestamp}>
            {message.user.name} - {new Date(message.timestamp).toLocaleString()}{' '}
            - {message.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
