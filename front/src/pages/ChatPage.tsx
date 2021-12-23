import { Box, Stack, Text, Img, Button, Icon, Input } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { chat, contact, message } from '../Types/types';
import Message from './components/Message';
import { IoArrowBackSharp, IoSendSharp } from 'react-icons/io5';
import MessageTail from './components/MessageTail';
import MessageBody from './components/MessageBody';

const myId = '1';

const ChatPage = ({
  chatState,
  contactState,
}: {
  chatState: {
    chatSelected: chat | null;
    setChatSelected: React.Dispatch<React.SetStateAction<chat | null>>;
  };
  contactState: {
    contact: contact | undefined;
    setContact?: React.Dispatch<React.SetStateAction<contact | undefined>>;
  };
}) => {
  const { chatSelected: chat, setChatSelected: setChat } = chatState;
  const { contact } = contactState;
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
        paddingInline={3}
        direction="row"
      >
        <Stack direction="row" align="center">
          <Img
            borderRadius="full"
            backgroundPosition="center"
            width="30px"
            height="30px"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.paragatitos.com%2Fwp-content%2Fuploads%2Fgatito-jugando-3.jpg&f=1&nofb=1"
          />
          <Text fontWeight={500}>{contact?.alias}</Text>
        </Stack>
        <Button borderRadius="full" minWidth="30px" padding={0} height="30px">
          <Icon as={IoArrowBackSharp} boxSize={5} />
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
        height="100%"
        overflowY="scroll"
      >
        {chat?.messages.map((message, index) => {
          return (
            <Message
              key={message._id}
              message={message}
              alignSelf={message.from._id === myId ? 'flex-end' : 'flex-start'}
              marginBlockStart={prevMessageItsMine(index) ? 1 : 5}
            >
              <MessageTail
                onLeftSide={message.from._id !== myId}
                onRightSide={message.from._id === myId}
                primaryColor="pale.green"
                secondaryColor="white"
              />
              <MessageBody
                bg={myId === message.from._id ? 'pale.green' : 'white'}
              >
                <Text alignSelf="flex-start" fontSize={14}>
                  {message.data}
                </Text>
                <Text alignSelf="flex-end" fontSize={11}>
                  {`${new Date(message.timestamp).getHours()}:${new Date(
                    message.timestamp
                  ).getMinutes()}`}
                </Text>
              </MessageBody>
            </Message>
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
      >
        <Input placeholder="Write here!" borderRadius="full" name="message" />
        <Button
          type="submit"
          width="50px"
          height="50px"
          padding={0}
          borderRadius="full"
          _focus={{}}
          _hover={{}}
          _active={{}}
        >
          <Icon as={IoSendSharp} color="gray.500" boxSize={6} />
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatPage;
