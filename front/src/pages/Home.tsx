import React from 'react';
import { Box, Container, Stack } from '@chakra-ui/layout';
import Chat from './components/Chat';
import { chat, contact, user } from '../Types/types';

const Home = ({
  chatState,
  contactListState,
  chatSelectedState,
}: {
  chatState: [chat[], React.Dispatch<React.SetStateAction<chat[]>>];
  contactListState: [
    contact[],
    React.Dispatch<React.SetStateAction<contact[]>>
  ];
  chatSelectedState: [chat, React.Dispatch<React.SetStateAction<chat>>];
}) => {
  const [chats, setChats] = chatState;
  const [contactList, setContactList] = contactListState;
  const [chatSelected, setChatSelected] = chatSelectedState;

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
    console.log(chat._id);
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
