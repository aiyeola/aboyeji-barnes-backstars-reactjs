import { createMuiTheme } from '@material-ui/core/styles';
import '@fontsource/caveat';
import '@fontsource/noto-sans-jp';

export default createMuiTheme({
  // palette: {
  //   common: {},
  //   primary: {},
  //   secondary: {}
  // },
  typography: {
    fontFamily: 'Noto Sans JP',
    //   h1: {},
    //   h3: {},
    //   h4: {},
    //   h6: {},
    body1: {},
    subtitle1: {
      fontFamily: 'Caveat',
      fontSize: '1.89rem',
      fontWeight: 300,
    },
    //   subtitle2: {},
    //   caption: {}
  },
  props: {
    MuiTextField: {
      size: 'small',
    },
    MuiTypography: {
      variantMapping: {
        h1: 'h2',
        h2: 'h2',
        h3: 'h2',
        h4: 'h2',
        h5: 'h2',
        h6: 'h2',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span',
      },
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
  },
});
// font-family:
//
// src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
