import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
  <App />
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
