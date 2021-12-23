import { Box, Stack, Text, Img, Button, Icon, Input } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { chat, contact, message } from '../Types/types';
import Message from './components/Message';
import { IoArrowBackSharp, IoSendSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const myId = '1';

interface params {
  chatState: {
    chatSelected: chat | null;
    setChatSelected: React.Dispatch<React.SetStateAction<chat | null>>;
  };
  contactState: {
    contact: contact | undefined;
    setContact?: React.Dispatch<React.SetStateAction<contact | undefined>>;
  };
}

const ChatPage = ({ chatState, contactState }: params) => {
  const { chatSelected: chat, setChatSelected: setChat } = chatState;
  const { contact } = contactState;
  const navigate = useNavigate();
  const chatRef = useRef<any>();

  const prevMessageItsMine = (index: number) => {
    const prevMessageOwner = chat?.messages[index - 1]?.from._id;
    const messageOwner = chat?.messages[index].from._id;
    if (prevMessageOwner === messageOwner || index === 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const message: message = {
      _id: `${Math.random() * 9000}`,
      from: {
        name: 'Tomas',
        lastName: 'Birbe',
        email: 'tomas.birbe@gmail.com',
        _id: `${myId}`,
      },
      data: e.target.message.value,
      timestamp: new Date().getTime(),
    };
    const updatedMessages: message[] | undefined =
      chat?.messages.concat(message);
    const updatedChat = Object.assign({}, chat, { messages: updatedMessages });
    setChat(updatedChat);
    e.target.message.value = '';
  };

  const backToHome = () => {
    console.log('hola');
    navigate('../home');
  };

  useEffect(() => {
    chatRef.current.scrollTop =
      chatRef.current.scrollHeight - chatRef.current.clientHeight;
  }, [chat]);

  return (
    <Stack spacing={0} height="full">
      {/* Header */}

      <Stack
        as="header"
        height="70px"
        width="full"
        bg="teal.green"
        align="center"
        justify="space-between"
        paddingInlineStart={4}
        paddingInlineEnd={6}
        direction="row"
        flexShrink={0}
      >
        <Stack direction="row" align="center">
          <Img
            borderRadius="full"
            backgroundPosition="center"
            width="30px"
            height="30px"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.paragatitos.com%2Fwp-content%2Fuploads%2Fgatito-jugando-3.jpg&f=1&nofb=1"
          />
          <Text fontWeight={500} color="white">
            {contact?.alias}
          </Text>
        </Stack>
        <Button
          borderRadius="full"
          minWidth="30px"
          padding={0}
          height="30px"
          onClick={() => backToHome()}
        >
          <Icon as={IoArrowBackSharp} boxSize={6} color="white" />
        </Button>
      </Stack>

      {/* Messages */}
      <Box
        ref={chatRef}
        as="ul"
        display="flex"
        flexDirection="column"
        paddingBlock={3}
        paddingInline={4}
        bg="background.500"
        height="full"
        overflowY="scroll"
      >
        {chat?.messages.map((message, index) => {
          return (
            <Message
              key={message._id}
              message={message}
              firstMessage={index === 0 ? true : false}
              prevMessageItsMine={prevMessageItsMine(index)}
            />
          );
        })}
      </Box>

      {/* Input */}

      <Stack
        as="form"
        width="full"
        bg="secondary.gray"
        paddingInlineStart={2}
        paddingInlineEnd={1}
        paddingBlock={2}
        direction="row"
        justify="space-between"
        align="center"
        onSubmit={(e) => handleSubmit(e)}
        flexShrink={0}
      >
        <Input placeholder="Write here!" borderRadius="full" name="message" />
        <Button
          type="submit"
          width="50px"
          height="50px"
          padding={0}
          borderRadius="full"
        >
          <Icon as={IoSendSharp} color="gray.500" boxSize={6} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatPage;
