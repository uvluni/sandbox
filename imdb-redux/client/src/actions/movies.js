import uuid from 'uuid';
import moment from 'moment';

// ADD_MOVIE
export const addMovie = (
  {
    id = uuid(),
    title = '',
    plot = '',
    price = 0,
    imageUrl = 'https://www.equalserving.com/images/es1scplugin/image-not-available.png',
    createdAt = moment()
  } = {}
) => ({
  type: 'ADD_MOVIE',
  movie: {
    id,
    title,
    plot,
    price,
    imageUrl,
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
