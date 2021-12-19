import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { chat } from '../Types/types';
import Message from './components/Message';

const myId = '1';

const ChatPage = ({ chat }: { chat: chat | null }) => {
  const prevMessageItsMine = (index: number) => {
    const prevMessageOwner = chat?.messages[index - 1]?.from._id;
    const messageOwner = chat?.messages[index].from._id;
    if (prevMessageOwner === messageOwner || index === 0) {
      return true;
    }
    return false;
  };

  return (
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
  );
};

export default ChatPage;
