// importing global variables
import React from 'react';
import ReactDOM from 'react-dom/client';
// importing assets
import './style.css';
// importing components (functions)
import MainContent from './components/MainContent';
import Navbar from './components/Navbar';
// still don't know
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // to render, 
  <React.StrictMode>
    <Navbar />
    <MainContent />
  </React.StrictMode>
);
reportWebVitals();
