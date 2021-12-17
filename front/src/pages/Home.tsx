import React from 'react';
import { Box, Container, Stack } from '@chakra-ui/layout';
import Chat from './components/Chat';
import { chat, contact, user } from '../Types/types';
import { useNavigate } from 'react-router-dom';

const Home = ({
  chatState,
  contactListState,
  chatSelectedState,
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
}) => {
  const { chats } = chatState;
  const { contactList } = contactListState;
  const { setChatSelected } = chatSelectedState;
  const navigate = useNavigate();

  const searchContact = (chat: chat): contact | undefined => {
    const userToFind: user | undefined = chat.participants.find(
      (user) => user._id !== '1'
    );
    const contact = contactList.find(
      (contact: contact) => contact.idContact === userToFind?._id
    );
    return contact;
  };

  const openChat = (chat: chat) => {
    setChatSelected(chat);
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
