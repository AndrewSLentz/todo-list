import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

if (!localStorage.getItem('todo') || localStorage.getItem('todo') === '[]') {
  localStorage.setItem('todo', JSON.stringify([{text: 'click an item to mark it as completed', completed: false}]))
}

ReactDOM.render(
  <App todo={JSON.parse(localStorage.getItem('todo'))}/>, document.getElementById('root'));
