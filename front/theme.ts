import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#128C7E',
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
      },
      'html,body,#root': {
        height: '100%',
      },
    },
  },
});

export default theme;
