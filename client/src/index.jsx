/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const body = document.querySelector('body');
const container = document.createElement('div');
body.append(container);

ReactDOM.render(<App />, container);
