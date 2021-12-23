import React from 'react';
import { Box, Container, Divider, Stack, Text } from '@chakra-ui/layout';
import Chat from './components/Chat';
import { chat, contact, user } from '../Types/types';
import { useNavigate } from 'react-router-dom';
import { IoChatbox, IoPersonAdd } from 'react-icons/io5';
import { Button, Icon, Img, Input, useDisclosure } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      <Container as="main" maxWidth="full" height="full" p={0}>
        <Stack
          as="header"
          bg="teal.green"
          width="full"
          height="70px"
          direction="row"
          justify="space-between"
          align="center"
          paddingInline={4}
        >
          <Text fontSize={20} fontWeight="bold" color="white">
            Chatsapp
          </Text>
          <Button>
            <Icon as={IoChatbox} boxSize={6} color="white" />
          </Button>
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
        <Button onClick={onOpen}>Open drawer</Button>
      </Container>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Stack direction="row" justify="space-between" align="center">
              <Text>Contact List</Text>
              <Button padding={0}>
                <Icon as={IoPersonAdd} boxSize={6} />
              </Button>
            </Stack>
          </DrawerHeader>
          <Divider />

          <DrawerBody padding={0}>
            <Stack as="ul">
              {contactList?.map((contact) => (
                <Button
                  key={contact._id}
                  padding={0}
                  width="full"
                  _hover={{ bg: 'gray.50' }}
                  height="60px"
                >
                  <Stack
                    direction="row"
                    width="full"
                    paddingInline={2}
                    paddingBlock={4}
                    align="center"
                  >
                    <Img
                      src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png"
                      width="40px"
                    />
                    <Text marginInlineStart={1}>{contact.alias}</Text>
                  </Stack>
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Home;
