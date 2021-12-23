import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    'pale.green': '#DCF8C6',
    'light.green': '#25D366',
    'teal.green': '#128C7E',
    'teal.green.dark': '#0D645A',
    'secondary.gray': '#f0f0f0',
    'background.500': '#ECE5DD',
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {},
        _focus: {
          boxShadow: 'none',
        },
        _active: {},
      },
      defaultProps: {
        variant: null,
      },
    },
    Input: {
      baseStyle: {
        field: {
          background: 'white',
          _focus: {},
          _hover: {},
          _active: {},
        },
      },
      size: {},
      variants: {
        oneLine: {
          field: {
            borderBottom: `1px solid`,
            borderColor: 'primary.500',
            background: 'transparent',
            borderRadius: '0px',
          },
        },
      },
      defaultProps: {
        variant: null,
      },
    },
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
      },
      'html,body,#root': {
        height: '100%',
      },
      ':-webkit-autofill': {
        webkitBoxShadow: '0 0 0 30px #DAF0E4 inset',
      },
      ':-webkit-autofill:focus': {
        webkitBoxShadow: '0 0 0 30px #DAF0E4 inset',
      },
      ':-webkit-autofill:active': {
        webkitBoxShadow: '0 0 0 30px #DAF0E4 inset',
      },
    },
  },
});

export default theme;
