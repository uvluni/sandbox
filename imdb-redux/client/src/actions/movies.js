import uuid from 'uuid';
import moment from 'moment';

// ADD_MOVIE
export const addMovie = (
  { description = '', note = '', price = 0, createdAt = moment() } = {}
) => ({
  type: 'ADD_MOVIE',
  movie: {
    id: uuid(),
    description,
    note,
    price,
    createdAt
  }
});

// REMOVE_MOVIE
export const removeMovie = ({ id } = {}) => ({
  type: 'REMOVE_MOVIE',
  id
});

// EDIT_MOVIE
export const editMovie = (id, updates) => ({
  type: 'EDIT_MOVIE',
  id,
  updates
});
