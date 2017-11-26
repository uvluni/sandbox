import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import Movie from './components/Movie';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Main} />
        <Route path="/:id" component={Movie} />
      </div>
    </Router>
  );
};

export default App;
