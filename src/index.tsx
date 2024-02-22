import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootEle = document.getElementById('root');

if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
