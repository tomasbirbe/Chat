import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (e: any) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/auth/login',
      data: {
        email: e.target[0].value,
        password: e.target[1].value,
      },
    }).then((token) => {
      console.log(token);
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email
        <input type="text" />
      </label>
      <label>
        Password
        <input type="text" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
