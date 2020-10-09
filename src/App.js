import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

// import history from './services/history'; verificar problema no uso do Router com o history
import Routes from './router';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes />
        <ToastContainer autoClose={4000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
