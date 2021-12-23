import { Box, Stack, Text } from '@chakra-ui/react';
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
    >
      {/* Message Tail */}
      <Box
        position="absolute"
        borderTop="30px solid"
        borderColor={myId == message.from._id ? 'pale.green' : 'white'}
        borderRight={myId === message.from._id ? '15px solid transparent' : ''}
        borderLeft={myId !== message.from._id ? '15px solid transparent' : ''}
        width="0"
        top={0}
        left={myId == message.from._id ? '' : '-8px'}
        right={myId == message.from._id ? '-8px' : ''}
        height="0"
        background="transparent"
      />

      {/* Message Body */}
      <Stack
        width="fit-content"
        borderRadius={7}
        paddingInline={2}
        paddingBlock={1.5}
        bg={myId === message.from._id ? 'pale.green' : 'white'}
        alignItems={myId === message.from._id ? 'flex-end' : 'flex-start'}
        spacing={3}
        position="static"
        direction="row"
        height="35px"
      >
        <Text alignSelf="flex-start" fontSize={14}>
          {message.data}
        </Text>

        <Text alignSelf="flex-end" fontSize={11}>
          {`${new Date(message.timestamp).getHours()}:${new Date(
            message.timestamp
          ).getMinutes()}`}
        </Text>
      </Stack>
    </Stack>
  );
};

export default Message;
