import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    body1: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontSize: 14,
    },
    body2: {
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      '@media (min-width: 600px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      '@media (min-width: 600px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      '@media (min-width: 600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      '@media (min-width: 600px)': {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: 12,
      color: '#6E7581',
    },
  },
  palette: {
    primary: {
      main: '#0D4CA0',
      light: '#4594FF',
      dark: '#173266',
      contrastText: '#fff',
    },
    secondary: {
      main: '#C3C9D6',
      light: '#F3F6FA',
    },
    info: {
      main: '#2196f3',
      light: '#F8FAFD',
    },
    success: {
      main: '#34A489',
    },
    error: {
      main: '#FB6060',
    },
    warning: {
      main: '#E89F11',
    },
    text: {
      primary: '#1A1E25',
      secondary: '#6E7581',
    },
    grey: {
      '400': '#F6F8FD',
      '500': '#E9EFFA',
      '600': '#C3C9D6',
      '700': '#6E7581',
      '900': '#1A1E25',
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 991,
      lg: 1280,
      xl: 1440,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          height: '100%',
        },
        body: {
          color: '#1A1E25',
          height: '100%',
          backgroundColor: '#fff',
          lineHeight: 1.43,
        },
        '::-webkit-input-placeholder': {
          fontWeight: 500,
          fontFamily: 'Inter',
          fontSize: '1em',
        },
        '::-webkit-scrollbar': {
          width: 5,
          height: 5,
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#E9EFFA',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#C3C9D6',
        },
        img: {
          maxWidth: '100%',
        },
        '#root': {
          height: '100%',
        },
      },
    },
    MuiButton: {
      root: {
        padding: '0.875rem 1rem',
        fontWeight: 500,
        textTransform: 'initial',
        letterSpacing: '0.02em',
      },
      label: {
        textTransform: 'capitalize',
        lineHeight: 1.43,
      },
      containedPrimary: {
        backgroundColor: '#0D4CA0',
      },
      colorInherit: {
        color: '#6E7581',
        borderColor: '#E9EFFA',
        '&:hover': {
          backgroundColor: '#E9EFFA',
        },
      },
      sizeSmall: {
        padding: '0.5rem 1rem',
        '&$outlinedSizeSmall': {
          padding: '7.5px 1rem',
        },
      },
      sizeLarge: {
        padding: '1rem 1.5rem',
      },
      outlined: {
        padding: '0.8125rem 1rem',
      },
      outlinedSizeLarge: {
        padding: '1rem 1.5rem',
      },
    },
    MuiTab: {
      root: {
        padding: '10px 0',
        textTransform: 'capitalize',
        fontWeight: 500,
        '&:not(:first-of-type)': {
          marginLeft: 32,
        },
        '@media (min-width: 600px)': {
          minWidth: 'inherit',
        },
      },
      textColorInherit: {
        color: '#C3C9D6 !important',
        opacity: 1,
        '&.Mui-selected': {
          color: '#1A1E25 !important',
          fontWeight: 700,
        },
      },
    },
    MuiTabs: {
      root: {
        marginBottom: 24,
      },
      flexContainer: {
        borderBottom: '1px solid #E9EFFA',
      },
    },
    MuiTable: {
      root: {
        tableLayout: 'fixed',
        maxWidth: '100%',
      },
    },
    MuiDialog: {
      paper: {
        maxWidth: '480px !important',
        width: '100%',
      },
    },
    MuiDialogContent: {
      root: {
        padding: '20px!important',
        '@media(min-width: 601px)': {
          padding: '40px 40px 24px !important',
        },
      },
    },
    MuiDialogActions: {
      root: {
        padding: '0 20px 20px !important',
        '@media(min-width: 601px)': {
          padding: '0 40px 20px 40px !important',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$disabled': {
          color: '#E9EFFA',
          '& $notchedOutline': {
            borderColor: '#E9EFFA',
          },
        },
        '&[class*=MuiAutocomplete-inputRoot]': {
          // padding: '0 !important',
          padding: '6.5px 55px 6.5px 7px !important',
          '& input': {
            // padding: '16px !important',
          },
        },
      },
      notchedOutline: {
        borderColor: '#E9EFFA',
      },
      input: {
        padding: 16,
        maxHeight: 48,
        height: 'auto',
      },
    },
    MuiStepper: {
      root: {
        '@media(max-width: 600px)': {
          padding: '20px 0',
        },
      },
    },
    MuiStepLabel: {
      root: {
        position: 'relative',
        zIndex: 10,
      },
      label: {
        color: '#6E7581',
        fontSize: 12,
        '@media(min-width: 600px)': {
          minWidth: 130,
        },
      },
      active: {
        color: '#1A1E25',
        fontWeight: 600,
      },
    },
    MuiStepConnector: {
      root: {
        width: '100%',
      },
      line: {
        borderColor: '#C3C9D6',
      },
      alternativeLabel: {
        left: '-50%',
        right: '50%',
        top: 8,
      },
    },
    MuiStepIcon: {
      root: {
        color: '#C3C9D6',
        fontSize: 16,
        '&$active': {
          color: '#6E7581',
        },
        '&$completed': {
          color: '#34A489',
        },
      },
      text: {
        display: 'none',
      },
    },
    MuiInputLabel: {
      shrink: {
        transform: 'translate(0, 2px) scale(0.85)',
        fontWeight: 500,
      },
      outlined: {
        transform: 'translate(14px, 17px) scale(1)',
      },
    },
    MuiLinearProgress: {
      root: {
        height: 8,
        borderRadius: 8,
      },
      barColorSecondary: {
        borderRadius: 8,
        backgroundColor: '#34A489',
      },
    },
    MuiChip: {
      root: {
        height: 'auto',
        padding: '7px 16px',
        borderRadius: 20,
        backgroundColor: 'rgba(233,239,250,0.5)',
        margin: '8px 16px 0 0',
      },
      label: {
        color: '#6E7581',
      },
      deleteIcon: {
        width: 16,
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: '0.5rem',
      },
    },
  },
});
