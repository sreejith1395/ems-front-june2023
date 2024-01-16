import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import Contextshare from './components/Contextshare';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <BrowserRouter>


  <Contextshare>

     
  <App />

  </Contextshare>

  
  </BrowserRouter>
   

  </React.StrictMode>
);

