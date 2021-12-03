import React, { useContext } from 'react';
import axios from 'axios';
import authContext from '../../authContext';
import { useNavigate } from 'react-router-dom';
import { Container, Link, Stack, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

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
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxWidth="xl%"
      height="100%"
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
            <Input type="email" height="40px" autoComplete="email" />
          </Stack>
          <Stack as="label" width="300px" align="center">
            <Text>Password</Text>
            <Input
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
        </Stack>
      </Stack>
    </Container>
  );
};

export default Login;
