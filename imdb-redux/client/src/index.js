import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from '../src/Components/routers/AppRouter';
import configureStore from './store/configureStore';
import { addMovie, removeMovie } from './actions/movies';
// import { setTextFilter, sortByPrice } from './actions/filters';
// import getVisibleMovies from './selectors/movies';

const store = configureStore();

store.dispatch(addMovie({ title: 'Kill Bill', price: 4500 }));
store.dispatch(addMovie({ title: 'The Room', price: 1000 }));
store.dispatch(addMovie({ title: 'Kill Bill 2', price: 5000 }));

// const aMovie = store.dispatch(addMovie({ title: 'Remove Movie', price: 5500 }));
// store.dispatch(removeMovie({ id: aMovie.movie.id }));

// store.dispatch(setTextFilter('bill'));

// store.dispatch(sortByPrice());

const state = store.getState();

console.log('state.movies', state.movies);
// console.log('state.filters', state.filters);

// const visibleMovies = getVisibleMovies(state.movies, state.filters);
// console.log('visibleMovies', visibleMovies);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
