import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Kurumsal Indigo
    },
    secondary: {
      main: '#f50057', // Vurgu rengi
    },
    background: {
      default: '#ffffffff', 
      paper: '#ffffffff',
    },
    text: {
      primary: '#334155', // Koyu gri metin
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#111827', // Koyu yan menü
          color: '#ffffff',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
