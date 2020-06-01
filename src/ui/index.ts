import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './root';

let root = document.getElementById('root');

if (root === null) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
}

ReactDOM.render(React.createElement(Root), root);
