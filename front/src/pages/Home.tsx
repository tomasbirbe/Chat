import React, { useContext, useEffect, useState } from 'react';
import socket from '../Connections/socket';
import authContext from '../../authContext';
import { Container, Stack, Grid, GridItem, Text } from '@chakra-ui/layout';
import { Img } from '@chakra-ui/react';

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
  return (
    <Container as="main" maxWidth="full" height="full" p={0}>
      <Stack spacing={0} width="full">
        <Stack spacing={0} direction="row" width="full">
          <Img
            borderRadius="full"
            width="60px"
            height="60px"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.paragatitos.com%2Fwp-content%2Fuploads%2Fgatito-jugando-3.jpg&f=1&nofb=1"
          />
          <Stack width="full">
            <Stack spacing={0} direction="row" justify="space-between">
              <Text>Tomas</Text>
              <Text>10:33 p.m.</Text>
            </Stack>
            <Text>Hola!</Text>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
