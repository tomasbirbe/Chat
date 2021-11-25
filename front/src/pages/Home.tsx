import React, { useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import authContext from '../../authContext';

const Home = () => {
  const socket = io('http://localhost:3001');
  useEffect(() => {
    socket.connect();
  });

  const auth = useContext(authContext);

  const sendMessage = (e: any) => {
    socket.emit('message:sendMessage', {
      token: auth.token,
      to: e.target[0].value,
      msg: e.target[1].value,
      type: 'private',
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
    </div>
  );
};

export default Home;
