import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './output.css'; // If it's in the same directory as index.js
import { createRoot } from 'react-dom/client';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(<App />);