import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { getFavorites } from "./pages/favorites/FavoritesActions";


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
      main: '#ff8a80',
      dark: '#b71c1c'
    }
  }
})

const store = configureStore();
store.dispatch(getFavorites());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
