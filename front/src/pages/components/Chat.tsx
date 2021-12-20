/* eslint-disable react/prop-types */
import { Stack, Img, Text } from '@chakra-ui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { chat, contact } from '../../Types/types';

const Chat = ({
  chat,
  contact,
}: {
  chat: chat;
  contact: contact | undefined;
}) => {
  const openChat = (_id: string) => {};

  return (
    <Stack
      spacing={2}
      direction="row"
      width="full"
      paddingBlock={4}
      paddingInline={3}
    >
      <Img
        borderRadius="full"
        width="50px"
        height="50px"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.paragatitos.com%2Fwp-content%2Fuploads%2Fgatito-jugando-3.jpg&f=1&nofb=1"
      />
      <Stack width="full" spacing={0}>
        <Stack
          spacing={0}
          direction="row"
          justify="space-between"
          align="center"
          paddingInlineEnd={3}
        >
          <Text fontWeight="bold">{contact?.alias}</Text>
          <Text fontWeight="100" fontSize={12}>
            {' '}
            {new Date(
              chat.messages[chat?.messages.length - 1].timestamp
            ).toLocaleDateString()}{' '}
          </Text>
        </Stack>
        <Text>{chat.messages[chat.messages.length - 1].data}</Text>
      </Stack>
    </Stack>
  );
};

export default Chat;
