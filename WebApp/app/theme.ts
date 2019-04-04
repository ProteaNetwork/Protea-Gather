import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const colors = {
  proteaBranding:{
    orange: '#f2a202',
    orangeDark: '#f57c00',
    orangeLight: '#ffa000',
    pink: '#FF4081',
    black: '#333333'
  },
  white: '#FFFFFF',
  black: '#000000',
  controls:{
    underline:{
      inactive: {
        color: "rgba(0,0,0,0.12)"
      },
      active:{
        color: "#FF8F00"
      }
    },
    labelColor: "rgba(255,255,255,0.38)"
  }
}

const theme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      paper: '#fff',
      default: colors.proteaBranding.orange
    },
    primary: {
      main: colors.proteaBranding.black,
    },
    secondary: {
      main: colors.proteaBranding.orangeLight,
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: '\'Roboto\', sans-serif',
  },
  overrides:{
    MuiButton:{
      root:{
        backgroundColor: colors.proteaBranding.pink,
        textTransform: "uppercase",
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '4px 4px 8px 0px rgba(0,0,0,0.2)',
        '&:hover':{
          color: colors.proteaBranding.pink,
          backgroundColor: '#FFFFFF'
        }
      },
      text: {
        padding: '7px 15px'
      }
    },
    MuiTypography:{
      h1:	{
        fontSize: 29,
      },
      h4: {
        fontSize: 21
      }
    },
    MuiInput:{
      formControl:{
        color: colors.white,
        fontSize: 21
      },
      underline:{
        "&:before": {
          borderBottomColor: "rgba(0,0,0,0.12)",
        },
        "&:after":{
          borderBottomColor: "rgba(0,0,0,0.12)",
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${colors.controls.underline.active.color} !important`,
        },
        '&$focused:after':{
          borderBottom: `2px solid ${colors.controls.underline.active.color} !important`,
        },
        '&$disabled':{
          color: colors.white,

        }
      }
    },
    MuiInputLabel:{
      root:{
        color: colors.controls.labelColor,
        fontSize: 21
      }
    },
    MuiFormLabel:{
      root:{
        color: colors.controls.labelColor,
        "&$focused": {
          color: colors.controls.labelColor
        },
        '&$disabled':{
          color: colors.white,
        }
      }
    },
    MuiFormHelperText:{
      root:{
        textAlign: "right"
      }
    },
    MuiFormControl:{
      root:{
        margin: "5px 0"
      }
    }
  }

});

export default theme;
