import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App todo={['click an item to delete it']}/>,
  document.getElementById('root')
);
