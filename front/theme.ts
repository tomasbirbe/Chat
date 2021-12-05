import { extendTheme } from '@chakra-ui/react';

const primary = '#128C7E';
const primaryDarker = '#0D645A';
const primaryDarkest = '#06322D';

const theme = extendTheme({
  colors: {
    primary,
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          backgroundColor: primaryDarker,
        },
        _focus: {
          boxShadow: 'none',
        },
        _active: {
          backgroundColor: primaryDarkest,
        },
      },
      defaultProps: {
        variant: null,
      },
    },
    Input: {
      baseStyle: {
        field: {
          background: 'red',
        },
      },
      size: {},
      variants: {
        oneLine: {
          field: {
            borderBottom: `1px solid ${primary}`,
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
        '-webkit-box-shadow': '0 0 0 30px #DAF0E4 inset ;',
      },
      ':-webkit-autofill:focus': {
        '-webkit-box-shadow': '0 0 0 30px #DAF0E4 inset ;',
      },
      ':-webkit-autofill:active': {
        '-webkit-box-shadow': '0 0 0 30px #DAF0E4 inset ;',
      },
    },
  },
});

export default theme;
