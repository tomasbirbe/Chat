import { Box, Stack, Text, Img, Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { chat, contact } from '../Types/types';
import Message from './components/Message';
import { IoArrowBackSharp } from 'react-icons/io5';

const myId = '1';

const ChatPage = ({
  chat,
  contact,
}: {
  chat: chat | null;
  contact: contact | undefined;
}) => {
  const prevMessageItsMine = (index: number) => {
    const prevMessageOwner = chat?.messages[index - 1]?.from._id;
    const messageOwner = chat?.messages[index].from._id;
    if (prevMessageOwner === messageOwner || index === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Stack
        as="header"
        height="60px"
        bg="green.600"
        align="center"
        justify="space-between"
        paddingInline={3}
        direction="row"
      >
        <Stack direction="row" align="center">
          <Img
            borderRadius="full"
            backgroundPosition="center"
            width="40px"
            height="40px"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.paragatitos.com%2Fwp-content%2Fuploads%2Fgatito-jugando-3.jpg&f=1&nofb=1"
          />
          <Text>{contact?.alias}</Text>
        </Stack>
        <Button borderRadius="full" minWidth="30px" padding={0} height="30px">
          <Icon as={IoArrowBackSharp} boxSize={5} />
        </Button>
      </Stack>
      <Box
        as="ul"
        display="flex"
        flexDirection="column"
        paddingBlockStart={3}
        paddingInline={4}
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
    </>
  );
};

export default ChatPage;
