import { Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { chat } from '../Types/types';
import Message from './components/Message';

const myId = '1';

const ChatPage = ({ chat }: { chat: chat | null }) => {
  const lastFrom = (index: number) => {
    return (
      chat?.messages[index - 1]?.from._id === chat?.messages[index].from._id
    );
  };

  return (
    <Stack>
      {chat?.messages.map((message, index) => {
        return (
          // Ver por que al aplicar margin en el primer stack solo aplica en el primer elemento
          <Stack
            key={message._id}
            alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
            spacing={0}
            marginBlockEnd={2}
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
              bg="red"
            >
              <Text>{message.data}</Text>
              <Text>{new Date(message.timestamp).toLocaleDateString()}</Text>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default ChatPage;
