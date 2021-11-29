import React, { useContext, useEffect, useState } from 'react';
import socket from '../Connections/socket';
import authContext from '../../authContext';

interface user {
  name: string;
  lastname: string;
  email: string;
  _id: string;
}

interface message {
  _id: string;
  from: user;
  to?: string;
  data: string;
  timestamp: number;
}

interface chat {
  _id: string;
  messages: message[];
}

const Home: React.FC = () => {
  const auth = useContext(authContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.emit('chats:updateAll', { token: auth.token });
  }, []);

  socket.on('updateChats:tomas.birbe@gmail.com', (chatsUpdated) => {
    console.log('chats actualizados');
    setChats(chatsUpdated);
  });

  const sendMessage = (e: any) => {
    socket.emit('message:sendMessage', {
      from: auth.token,
      to: e.target[0].value,
      data: e.target[1].value,
    });
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <label>
          Email receptor
          <input type="email" />
        </label>
        <label>
          Mensaje
          <textarea></textarea>
        </label>
        <button type="submit">Send message</button>
      </form>
      <button onClick={() => console.log(chats)}>Show chats</button>
      {chats.map((chat: chat) => {
        return (
          <ul key={chat._id}>
            {chat.messages.map((message: message) => {
              return (
                <li key={message._id}>
                  {`${message.from.name} - ${message.data}`}{' '}
                  <small>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </small>{' '}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default Home;
