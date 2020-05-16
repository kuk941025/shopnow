import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans KR',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      light: '#b2dfdb',
      main: '#80cbc4',
      dark: '#4db6ac',
    },
    secondary: {
      light: '#ff8a80',
      main: '#d50000',
      dark: '#b71c1c'
    }
  }
})
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
