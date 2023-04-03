import 'react-toastify/dist/ReactToastify.css';
import './style/main.scss';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Cart } from './pages/Cart/Cart';
import { MainPage } from './pages/MainPage/MainPage';
import { Page404 } from './pages/Page404/Page404';
import store from './redux/store';

export default function App() {
  return (
    <div className="app">
      <h1 className="header">Test Calc</h1>

      <BrowserRouter>
        <ToastContainer />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}
