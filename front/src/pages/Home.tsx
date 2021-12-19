import React from 'react';
import { Box, Container, Stack } from '@chakra-ui/layout';
import Chat from './components/Chat';
import { chat, contact, user } from '../Types/types';
import { useNavigate } from 'react-router-dom';

const myId = '1';

const Home = ({
  chatState,
  contactListState,
  chatSelectedState,
  contactState,
}: {
  chatState: {
    chats: chat[];
  };
  contactListState: {
    contactList: contact[];
  };
  chatSelectedState: {
    setChatSelected: React.Dispatch<React.SetStateAction<chat | null>>;
  };
  contactState: {
    setContact: React.Dispatch<React.SetStateAction<contact | undefined>>;
  };
}) => {
  const { chats } = chatState;
  const { contactList } = contactListState;
  const { setChatSelected } = chatSelectedState;
  const { setContact } = contactState;
  const navigate = useNavigate();

  const searchContact = (chat: chat | null): contact | undefined => {
    const userToFind: user | undefined = chat?.participants.find(
      (user) => user._id !== myId
    );
    const contact = contactList.find(
      (contact: contact) => contact.idContact === userToFind?._id
    );
    return contact;
  };

  const openChat = (chat: chat) => {
    setChatSelected(chat);
    setContact(searchContact(chat));
    navigate(`../chat`);
  };

  return (
    <Container as="main" maxWidth="full" height="full" p={0}>
      <Stack as="header" bg="green.500">
        Header
      </Stack>
      <Box as="section">
        {chats.map((chat: chat) => (
          <Box
            key={chat._id}
            as="article"
            onClick={() => openChat(chat)}
            sx={{
              userSelect: 'none',
            }}
            _hover={{ bg: 'gray.100', cursor: 'pointer' }}
            _active={{ bg: 'gray.200' }}
          >
            <Chat chat={chat} contact={searchContact(chat)} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
