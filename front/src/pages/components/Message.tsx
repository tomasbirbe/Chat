import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { message } from '../../Types/types';

const myId = '1';

const Message = ({
  message,
  marginBlockStart,
  alignSelf,
  children,
  ...props
}: {
  message: message;
  marginBlockStart: number;
  alignSelf: string;
  children: any;
}) => {
  console.log(children);
  return (
    <Stack
      as="li"
      alignSelf={alignSelf}
      spacing={0}
      marginBlockStart={marginBlockStart}
      position="relative"
    >
      {children}
    </Stack>
  );
};

export default Message;
