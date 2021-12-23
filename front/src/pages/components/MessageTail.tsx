import { Box } from '@chakra-ui/react';
import React, { ReactChild } from 'react';

const MessageTail = ({
  onLeftSide = true,
  onRightSide = false,
  primaryColor,
  secondaryColor,
  ...props
}: {
  onLeftSide: boolean;
  onRightSide: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}) => {
  return (
    <Box
      position="absolute"
      borderTop="30px solid"
      borderColor={onRightSide ? primaryColor : secondaryColor}
      borderRight={onRightSide ? '15px solid transparent' : ''}
      borderLeft={onLeftSide ? '15px solid transparent' : ''}
      width={0}
      top={0}
      left={onRightSide ? '' : '-8px'}
      right={onRightSide ? '-8px' : ''}
      height={0}
      background="transparent"
      {...props}
    />
  );
};

export default MessageTail;
