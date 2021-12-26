import React, { useEffect, useState } from 'react';
import { Box, Container, Divider, Stack, Text } from '@chakra-ui/layout';
import Chat from './components/Chat';
import { chat, contact, user } from '../Types/types';
import { useNavigate } from 'react-router-dom';
import {
  IoAddSharp,
  IoArrowBackSharp,
  IoChatbox,
  IoPersonAdd,
  IoPersonSharp,
} from 'react-icons/io5';
import {
  Button,
  FormLabel,
  Icon,
  Img,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
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

interface params {
  chatState: {
    chats: chat[];
  };
  contactListState: {
    contactList: contact[];
    setContactList: React.Dispatch<React.SetStateAction<any>>;
  };
  chatSelectedState: {
    setChatSelected: React.Dispatch<React.SetStateAction<chat | null>>;
  };
  contactState: {
    setContact: React.Dispatch<React.SetStateAction<contact | undefined>>;
  };
}

const Home = ({
  chatState,
  contactListState,
  chatSelectedState,
  contactState,
}: params) => {
  const { chats } = chatState;
  const { contactList, setContactList } = contactListState;
  const [showForm, setShowForm] = useState<boolean>(false);
  const { setChatSelected } = chatSelectedState;
  const { setContact } = contactState;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newContact: contact = {
      alias: `${e.target.lastName.value} ${e.target.name.value}`,
      email: e.target.email.value,
    };
    setContactList([...contactList, newContact]);
    setShowForm(false);
  };

  const handleDelete = (email: string) => {
    const updatedArray = contactList.filter(
      (contact) => contact.email !== email
    );
    setContactList(updatedArray);
  };

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

  useEffect(() => {
    console.log(contactList);
  }, [contactList]);

  return (
    <>
      <Container
        as="main"
        maxWidth="full"
        height="full"
        p={0}
        overflowY="hidden"
      >
        <Stack
          as="header"
          bg="teal.green"
          width="full"
          height="70px"
          direction="row"
          justify="space-between"
          align="center"
          paddingInline={5}
        >
          <Text fontSize={20} fontWeight="bold" color="white">
            Chatsapp
          </Text>
          <Button padding={0} onClick={onOpen}>
            <Icon as={IoPersonSharp} boxSize={6} color="white" />
          </Button>
        </Stack>
        <Box as="section" overflowY="auto" height="full">
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
        <Button
          padding={0}
          bg="teal.green"
          borderRadius="full"
          position="fixed"
          width="50px"
          height="50px"
          bottom="25px"
          right="12px"
        >
          <Icon as={IoChatbox} boxSize={5} color="white" />
        </Button>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Stack justify="space-between" align="center">
              <Stack
                direction="row"
                width="full"
                justify="space-between"
                align="center"
              >
                <Button padding={0}>
                  <Icon as={IoArrowBackSharp} boxSize={6} onClick={onClose} />
                </Button>
                <Text>{showForm ? 'Add new contact' : 'Contact List'}</Text>

                <Button padding={0} onClick={() => setShowForm(true)}>
                  <Icon as={IoPersonAdd} boxSize={6} />
                </Button>
              </Stack>
            </Stack>
          </DrawerHeader>
          <Divider />

          <DrawerBody padding={0}>
            {showForm ? (
              // Form for a new user
              <Stack
                as="form"
                padding={4}
                spacing={4}
                onSubmit={(e) => handleSubmit(e)}
              >
                <FormLabel>
                  <Text>Name</Text>
                  <Input
                    name="name"
                    variant="oneLine"
                    borderColor="teal.green"
                  />
                </FormLabel>
                <FormLabel>
                  <Text>Lastname</Text>
                  <Input
                    name="lastName"
                    variant="oneLine"
                    borderColor="teal.green"
                  />
                </FormLabel>
                <FormLabel>
                  <Text>E-mail</Text>
                  <Input
                    name="email"
                    variant="oneLine"
                    borderColor="teal.green"
                  />
                </FormLabel>
                <Button type="submit" bg="teal.green" color="white">
                  Guardar Contacto
                </Button>
              </Stack>
            ) : (
              // Contact list
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
                    <Stack>
                      <Button onClick={() => handleDelete(contact.email)}>
                        Delete
                      </Button>
                    </Stack>
                  </Button>
                ))}
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Home;
