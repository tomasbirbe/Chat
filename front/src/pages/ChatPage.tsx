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
    <Stack as="ul" spacing={2} paddingBlockStart={3}>
      {chat?.messages.map((message, index) => {
        return (
          <Stack
            as="li"
            key={message._id}
            alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
            spacing={0}
          >
            <Stack
              width="fit-content"
              bg="red"
              borderRadius={7}
              paddingInline={4}
              paddingBlock={1}
              alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
              marginBlockStart={lastFrom(index) || index === 0 ? -1 : 4}
              spacing={0}
              sx={{
                '&::after': {
                  content: `hola`,
                  position: 'float',
                  top: '-25px',
                  width: '20px',
                  height: '20px',
                  background: 'green',
                },
              }}
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
