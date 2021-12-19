import { Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { message } from '../../Types/types';

const myId = '1';

const Message = ({
  message,
  prevMessageItsMine,
  firstMessage,
}: {
  message: message;
  prevMessageItsMine: boolean;
  firstMessage: boolean;
}) => {
  return (
    <Stack
      as="li"
      alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
      spacing={0}
      marginBlockStart={prevMessageItsMine || firstMessage ? 1 : 5}
      position="relative"
      sx={{
        '&::after':
          !prevMessageItsMine || firstMessage
            ? {
                content: '""',
                position: 'absolute',
                borderTop: '30px solid lightgray',
                borderRight:
                  myId === message.from._id ? '15px solid transparent' : '',
                borderLeft:
                  myId !== message.from._id ? '15px solid transparent' : '',
                width: '0',
                zIndex: '-1',
                top: 0,
                left: myId === message.from._id ? '' : '-8px',
                right: myId === message.from._id ? '-8px' : '',
                height: '0',
                background: 'transparent',
              }
            : {},
      }}
    >
      <Stack
        width="fit-content"
        bg="gray.300"
        borderRadius={7}
        paddingInline={4}
        paddingBlock={2}
        alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
        spacing={0}
        position="static"
      >
        <Stack direction="row" justify="space-between" width="fit-content">
          <Text>{message.data}</Text>
          <Text>{new Date(message.timestamp).toLocaleTimeString()}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Message;
