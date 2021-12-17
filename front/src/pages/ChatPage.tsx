import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { chat } from '../Types/types';
import Message from './components/Message';

const myId = '1';

const ChatPage = ({ chat }: { chat: chat | null }) => {
  const lastFrom = (index: number) => {
    if (index === 0) {
      return false;
    }
    return (
      chat?.messages[index - 1]?.from._id === chat?.messages[index].from._id
    );
  };

  return (
    <Stack as="ul" spacing={0}>
      {chat?.messages.map((message, index) => {
        return (
          // Ver por que al aplicar margin en el primer stack solo aplica en el primer elemento
          <Stack
            as="li"
            key={message._id}
            alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
            spacing={0}
          >
            <Stack
              width="fit-content"
              alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
              marginBlockStart={lastFrom(index) || index === 0 ? 0 : 8}
            >
              {lastFrom(index) ? (
                ''
              ) : (
                <Stack>
                  <Text>{message.from.name}</Text>
                </Stack>
              )}

              <Stack
                direction="row"
                justify="space-between"
                width="fit-content"
              >
                <Text>{message.data}</Text>
                <Text>{new Date(message.timestamp).toLocaleTimeString()}</Text>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default ChatPage;
