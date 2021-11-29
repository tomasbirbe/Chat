import React, { useContext } from 'react';
import axios from 'axios';
import authContext from '../../authContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/auth/login',
      data: {
        email: e.target[0].value,
        password: e.target[1].value,
      },
    })
      .then(({ data }) => {
        auth.isLogged = true;
        auth.token = data.token;
        navigate('../Home');
      })
      .catch(({ response }) => console.log(response.data));
  };

  return (
    <form onSubmit={handleLogin} autoComplete="true">
      <label>
        Email
        <input type="email" autoComplete="email" />
      </label>
      <label>
        Password
        <input type="password" autoComplete="current-password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
