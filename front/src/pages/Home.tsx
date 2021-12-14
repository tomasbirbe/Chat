import React, { useContext, useEffect, useState } from 'react';
import socket from '../Connections/socket';
import authContext from '../../authContext';
import { Container, Stack, Grid, GridItem, Text } from '@chakra-ui/layout';
import { Img } from '@chakra-ui/react';
import Chat from './components/Chat';
import { chat, contact, user } from '../Types/types';
import { Navigate } from 'react-router-dom';

const Home: React.FC = ({ chatState, contactListState }: any) => {
  const [chat, setChat] = chatState;
  const [contactList, setContactList] = contactListState;

  const searchContact = (chat: chat): contact | undefined => {
    const userToFind: user | undefined = chat.participants.find(
      (user) => user._id !== '1'
    );
    const contact = contactList.find(
      (contact) => contact.idContact === userToFind?._id
    );
    return contact;
  };

  return (
    <Container as="main" maxWidth="full" height="full" p={0}>
      <Stack as="header" bg="green.500">
        Header
      </Stack>
      {chats.map((chat) => (
        <Chat key={chat._id} chat={chat} contact={searchContact(chat)} />
      ))}
    </Container>
  );
};

export default Home;
