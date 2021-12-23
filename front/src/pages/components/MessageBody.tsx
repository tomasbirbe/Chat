import { Stack } from '@chakra-ui/react';
import React from 'react';

const MessageBody = ({ children, ...props }: any) => {
  return (
    <Stack
      width="fit-content"
      borderRadius={7}
      paddingInline={2}
      paddingBlock={1.5}
      spacing={3}
      position="static"
      direction="row"
      height="35px"
      {...props}
    >
      {children}
    </Stack>
  );
};

export default MessageBody;
