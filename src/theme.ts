import { createMuiTheme } from '@material-ui/core/styles';
import '@fontsource/caveat';
import '@fontsource/noto-sans-jp';

export default createMuiTheme({
  typography: {
    fontFamily: 'Noto Sans JP',
    subtitle1: {
      fontFamily: 'Caveat',
      fontSize: '1.89rem',
      fontWeight: 300,
    },
  },
  props: {
    MuiTextField: {
      size: 'small',
    },
    MuiTypography: {
      variantMapping: {
        body1: 'span',
      },
    },
    MuiCircularProgress: {
      size: 24,
    },
    MuiSnackbar: {
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    },
    MuiButton: {
      disableElevation: true,
      variant: 'contained',
      color: 'primary',
      fullWidth: true,
    },
  },
  overrides: {
    MuiButton: {
      text: {
        fontFamily: 'Noto Sans JP',
      },
    },
    MuiPaper: {
      rounded: {},
    },
    MuiFormHelperText: {
      root: {
        '&$error': {
          position: 'absolute',
          marginTop: '2.5rem',
          width: '15rem',
        },
      },
    },
    MuiTab: {
      root: {
        minWidth: 0,
        '@media (min-width: 0px)': {
          minWidth: 0,
        },
      },
    },
  },
});
