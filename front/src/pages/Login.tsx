import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import authContext from '../../authContext';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Link, Stack, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

const getCookie = (cookie: string) => {
  const cookieName = cookie + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const c = cookie[i];
    while (c.charAt(0) === ' ') {
      c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
};

const Login: React.FC = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = getCookie('token');
    console.log(getCookie('token'));
    console.log(cookieToken);
    if (cookieToken) {
      auth.isLogged = true;
      auth.token = cookieToken;
      navigate('../Home');
    }
  }, []);

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
        const now: number = new Date().getTime();
        auth.isLogged = true;
        auth.token = data.token;
        document.cookie = `token=${data.token}; expires=${new Date(
          data.expiresIn * 1000 + now
        ).toUTCString()}; path=/;`;
        navigate('../Home');
      })
      .catch(({ response }) => console.log(response.data));
  };

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="xl%"
      height="100%"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgImage="url('../../assets/wallpaper.jpg')"
    >
      <Stack
        as="form"
        onSubmit={handleLogin}
        autoComplete="true"
        paddingBlock={8}
        justify="center"
        align="center"
        spacing={9}
      >
        <Stack>
          <Stack as="label" width="300px" align="center">
            <Text>Email</Text>
            <Input
              type="email"
              height="40px"
              autoComplete="email"
              variant="oneLine"
            />
          </Stack>
          <Stack as="label" width="300px" align="center">
            <Text>Password</Text>
            <Input
              variant="oneLine"
              type="password"
              height="40px"
              autoComplete="current-password"
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          align="center"
          justify="space-between"
          paddingInline={0}
          width="full"
        >
          <Link>Register</Link>
          <Button
            type="submit"
            bg="primary"
            color="white"
            borderRadius="full"
            height="50px"
            width="150px"
          >
            Login
          </Button>
          <Button onClick={() => getCookie('token')}>Cookie</Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;
