import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#6e6e73',
    },
    primary: {
      main: '#1d1d1f',
      contrastText: '#ffffff',
    },
    divider: 'rgba(0,0,0,0.08)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: {
      fontSize: '28px',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontSize: '17px',
      fontWeight: 600,
      letterSpacing: '-0.2px',
    },
    body1: {
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f5f7',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '12px',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '980px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '15px',
          padding: '8px 20px',
        },
        containedPrimary: {
          backgroundColor: '#1d1d1f',
          '&:hover': {
            backgroundColor: '#3a3a3c',
          },
        },
        text: {
          color: '#1d1d1f',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'default',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          color: '#1d1d1f',
          boxShadow: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#6e6e73',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          backgroundColor: '#f5f5f7',
          padding: '12px 16px',
        },
        body: {
          fontSize: '15px',
          color: '#1d1d1f',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          padding: '14px 16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.02)',
          },
          '&:last-child td': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#6e6e73',
          '&:hover': {
            color: '#1d1d1f',
          },
          '&.Mui-active': {
            color: '#1d1d1f',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '12px',
          height: '24px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '20px',
          fontWeight: 600,
          paddingBottom: '8px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '& fieldset': {
            borderColor: 'rgba(0,0,0,0.15)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0,0,0,0.3)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1d1d1f',
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '15px',
          color: '#6e6e73',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#6e6e73',
          '&:hover': {
            color: '#1d1d1f',
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        },
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        autoHideDuration: 3000,
      },
    },
  },
})

export default theme
